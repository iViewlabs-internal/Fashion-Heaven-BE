const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, require: true, minlegth: 2, maxlegth: 20 },
  price: { type: Number, require: true },
  size: {
    type: Array,
    items: {
      type: String,
    },
  },
  SKU: { type: String, require: true },
  productDetails: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  reviews: [
    {
      rating: { type: Number },
      reviewDescription: { type: String },
    },
  ],
  quantity: { type: Number, require: true },
  category: { type: String, require: true },
  color: {
    type: Array,
    items: {
      type: String,
    },
  },
  audience: { type: String, require: true },
  adminId: { type: String, require: true },
  date: { type: String },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
