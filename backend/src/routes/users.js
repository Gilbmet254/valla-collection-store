const express = require('express');
const router = express.Router();
const {
  updateProfile,
  addToCart,
  removeFromCart,
  updateCartItem,
  getCart,
  clearCart,
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.put('/profile', auth, updateProfile);
router.post('/cart', auth, addToCart);
router.delete('/cart/:productId/:size', auth, removeFromCart);
router.put('/cart/:productId/:size', auth, updateCartItem);
router.get('/cart', auth, getCart);
router.delete('/cart', auth, clearCart);
router.post('/wishlist', auth, addToWishlist);
router.delete('/wishlist/:productId', auth, removeFromWishlist);
router.get('/wishlist', auth, getWishlist);

module.exports = router;
