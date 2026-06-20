const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderDetails,
  updateDeliveryStatus,
  getAllPayments,
  getLowStockProducts,
  getSalesAnalytics
} = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

router.get('/dashboard', adminAuth, getDashboardStats);
router.get('/users', adminAuth, getAllUsers);
router.get('/users/:id', adminAuth, getUserDetails);
router.put('/users/:id', adminAuth, updateUser);
router.delete('/users/:id', adminAuth, deleteUser);
router.get('/orders', adminAuth, getAllOrders);
router.get('/orders/:id', adminAuth, getOrderDetails);
router.put('/orders/:id/delivery', adminAuth, updateDeliveryStatus);
router.get('/payments', adminAuth, getAllPayments);
router.get('/products/low-stock', adminAuth, getLowStockProducts);
router.get('/analytics/sales', adminAuth, getSalesAnalytics);

module.exports = router;
