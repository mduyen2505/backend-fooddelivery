const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/OrderDetailController');
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/orderdetails', authMiddleware, orderDetailController.createOrderDetails);  // Tạo chi tiết đơn hàng từ giỏ hàng
router.get('/orderdetails/:order_id', authMiddleware, orderDetailController.getOrderDetailsByOrderId);  // Lấy chi tiết đơn hàng
router.delete('/orderdetails/:order_id', authMiddleware, orderDetailController.deleteOrderDetailsByOrderId); 

module.exports = router;