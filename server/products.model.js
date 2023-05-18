const mongoose = require('mongoose');

// Define a schema and model
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
  }, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}, 
    timestamps: true
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
