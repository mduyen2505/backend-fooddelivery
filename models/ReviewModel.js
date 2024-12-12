const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  ID_Product: { type: Number , ref: 'Product', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false },
  }, { timestamps: true });
  module.exports = mongoose.model('Review', ReviewSchema);

  