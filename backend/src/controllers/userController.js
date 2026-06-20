const User = require('../models/User');
const Product = require('../models/Product');

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, address },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;
    
    const user = await User.findById(req.user._id);
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Check if product already in cart
    const existingItem = user.cart.find(
      item => item.product.toString() === productId && item.size === size
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({
        product: productId,
        quantity,
        size
      });
    }
    
    await user.save();
    await user.populate('cart.product');
    
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId, size } = req.params;
    
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(
      item => !(item.product.toString() === productId && item.size === size)
    );
    
    await user.save();
    await user.populate('cart.product');
    
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { productId, size } = req.params;
    const { quantity } = req.body;
    
    const user = await User.findById(req.user._id);
    const cartItem = user.cart.find(
      item => item.product.toString() === productId && item.size === size
    );
    
    if (cartItem) {
      cartItem.quantity = quantity;
    }
    
    await user.save();
    await user.populate('cart.product');
    
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    
    await user.populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    
    await user.save();
    await user.populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get wishlist
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateProfile,
  addToCart,
  removeFromCart,
  updateCartItem,
  getCart,
  clearCart,
  addToWishlist,
  removeFromWishlist,
  getWishlist
};
