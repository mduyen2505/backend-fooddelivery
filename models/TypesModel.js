const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    ID_Type: { type: Number, required: true, unique: true }, 
    Type_name: { type: String, required: true },
}, 
{ timestamps: true });

const Type = mongoose.model('Type', TypeSchema);

module.exports = Type;

