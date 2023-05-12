const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productID: {
    type: String,
  },
  orderDate: {
    type: Date,
  },
  orderStatus: {
    type: String,
  },
  consumerID: {
    type: String,
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  color: {
    type: String,
  },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
