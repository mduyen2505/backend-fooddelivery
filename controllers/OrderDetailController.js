// controllers/orderDetailController.js
const OrderDetail = require('../models/OrderDetailModel');

// Tạo chi tiết đơn hàng từ giỏ hàng
exports.createOrderDetails = async (order_id, cartItems) => {
    try {
        const orderDetails = cartItems.map(item => ({
            order_id: order_id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price
        }));
        await OrderDetail.insertMany(orderDetails);
    } catch (error) {
        console.error('Lỗi tạo chi tiết đơn hàng:', error);
        throw error;
    }
};

// Lấy chi tiết đơn hàng theo order_id
exports.getOrderDetailsByOrderId = async (order_id) => {
    try {
        return await OrderDetail.find({ order_id }).populate('product_id');
    } catch (error) {
        console.error('Lỗi lấy chi tiết đơn hàng:', error);
        throw error;
    }
};

// Xóa tất cả chi tiết đơn hàng theo order_id (nếu cần)
exports.deleteOrderDetailsByOrderId = async (order_id) => {
    try {
        await OrderDetail.deleteMany({ order_id });
    } catch (error) {
        console.error('Lỗi xóa chi tiết đơn hàng:', error);
        throw error;
    }
};