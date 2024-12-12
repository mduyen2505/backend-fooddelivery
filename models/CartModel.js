// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ID_Product: { type: Number , ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true } 
});

module.exports = mongoose.model('Cart', cartSchema);
