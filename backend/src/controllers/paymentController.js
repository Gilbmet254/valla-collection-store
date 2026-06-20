const Payment = require('../models/Payment');
const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

// M-Pesa Payment
const processMpesaPayment = async (req, res) => {
  try {
    const { orderId, phoneNumber, amount } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // M-Pesa STK Push implementation
    const mpesaResponse = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: Buffer.from(
          process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + new Date().toISOString().slice(0, 19).replace(/[-T:]/g, '')
        ).toString('base64'),
        Timestamp: new Date().toISOString().slice(0, 19).replace(/[-T:]/g, ''),
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: `${process.env.CALLBACK_URL}/api/payments/mpesa/callback`,
        AccountReference: orderId,
        TransactionDesc: 'Payment for Valla Collection Order'
      },
      {
        headers: {
          Authorization: `Bearer ${await getMpesaToken()}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Create payment record
    const payment = await Payment.create({
      order: orderId,
      user: req.user._id,
      paymentMethod: 'mpesa',
      amount,
      status: 'pending',
      paymentDetails: {
        mpesa: {
          phoneNumber,
          transactionId: mpesaResponse.data.MerchantRequestID
        }
      }
    });

    res.json({
      message: 'M-Pesa payment initiated',
      paymentId: payment._id,
      merchantRequestID: mpesaResponse.data.MerchantRequestID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// M-Pesa Callback
const mpesaCallback = async (req, res) => {
  try {
    const { Body } = req.body;
    const { stkCallback } = Body;
    const { MerchantRequestID, ResultCode, CallbackMetadata } = stkCallback;

    const payment = await Payment.findOne({
      'paymentDetails.mpesa.transactionId': MerchantRequestID
    });

    if (payment) {
      if (ResultCode === 0) {
        payment.status = 'completed';
        payment.paymentDetails.mpesa.receiptNumber = CallbackMetadata.Item.find(i => i.Key === 'MpesaReceiptNumber').Value;
        payment.transactionId = CallbackMetadata.Item.find(i => i.Key === 'MpesaTransactionID').Value;

        const order = await Order.findById(payment.order);
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: payment.transactionId,
          status: 'completed',
          transaction_id: payment.transactionId
        };
        await order.save();
      } else {
        payment.status = 'failed';
      }
      await payment.save();
    }

    res.json({ ResultCode: 0, ResultDesc: 'Success' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Card Payment (Stripe)
const processCardPayment = async (req, res) => {
  try {
    const { orderId, paymentMethodId, amount } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'kes',
      payment_method: paymentMethodId,
      confirm: true,
      metadata: { orderId }
    });

    // Create payment record
    const payment = await Payment.create({
      order: orderId,
      user: req.user._id,
      paymentMethod: 'card',
      amount,
      status: paymentIntent.status === 'succeeded' ? 'completed' : 'pending',
      transactionId: paymentIntent.id,
      paymentDetails: {
        card: {
          cardLast4: paymentIntent.payment_method.card.last4,
          cardBrand: paymentIntent.payment_method.card.brand,
          stripePaymentIntentId: paymentIntent.id
        }
      }
    });

    if (paymentIntent.status === 'succeeded') {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: paymentIntent.id,
        status: 'completed',
        transaction_id: paymentIntent.id
      };
      await order.save();
    }

    res.json({
      message: 'Card payment processed',
      paymentId: payment._id,
      status: paymentIntent.status
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bitcoin Payment
const processBitcoinPayment = async (req, res) => {
  try {
    const { orderId, amount, walletAddress, transactionHash } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Create payment record
    const payment = await Payment.create({
      order: orderId,
      user: req.user._id,
      paymentMethod: 'bitcoin',
      amount,
      status: 'pending',
      paymentDetails: {
        bitcoin: {
          walletAddress,
          transactionHash
        }
      }
    });

    // In production, you would verify the transaction on the blockchain
    // For now, we'll mark it as completed after verification
    // payment.status = 'completed';
    // payment.transactionId = transactionHash;

    res.json({
      message: 'Bitcoin payment initiated',
      paymentId: payment._id,
      walletAddress: process.env.BITCOIN_WALLET_ADDRESS
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId)
      .populate('order')
      .populate('user', 'name email');

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to get M-Pesa token
async function getMpesaToken() {
  const auth = Buffer.from(
    process.env.MPESA_CONSUMER_KEY + ':' + process.env.MPESA_CONSUMER_SECRET
  ).toString('base64');

  const response = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`
      }
    }
  );

  return response.data.access_token;
}

module.exports = {
  processMpesaPayment,
  mpesaCallback,
  processCardPayment,
  processBitcoinPayment,
  getPaymentStatus
};
