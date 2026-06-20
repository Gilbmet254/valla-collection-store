const express = require('express');
const router = express.Router();
const {
  processMpesaPayment,
  mpesaCallback,
  processCardPayment,
  processBitcoinPayment,
  getPaymentStatus
} = require('../controllers/paymentController');
const { auth } = require('../middleware/auth');

router.post('/mpesa', auth, processMpesaPayment);
router.post('/mpesa/callback', mpesaCallback);
router.post('/card', auth, processCardPayment);
router.post('/bitcoin', auth, processBitcoinPayment);
router.get('/:paymentId', auth, getPaymentStatus);

module.exports = router;
