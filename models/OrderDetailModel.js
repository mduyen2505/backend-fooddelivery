const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
    // ID_OrderDetail: { type: mongoose.Schema.Types.ObjectId, required: true, unique:true },
    ID_Order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    ID_Product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);