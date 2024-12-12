const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, 
    sequenceValue: { type: Number, default: 0 }
});

// Tạo model cho Counter
const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;

