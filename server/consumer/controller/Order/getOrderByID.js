const Order = require("../../models/Order");
const Product = require("../../models/ProductData");
const resources = require("../../config/resources");
const getUserOrder = async (req, res) => {
  const orderID = req.body.orderID;
  try {
    const orderDetails = await Order.findOne({ _id: orderID });
    const productDetails = await Product.find({ _id: orderDetails.productID });
    const allOrderData = {
      orderDate: orderDetails.orderDate,
      orderStatus: orderDetails.orderStatus,
      consumeId: orderDetails.consumerID,
      quantity: orderDetails.quantity,
      size: orderDetails.size,
      color: orderDetails.color,
      productData: productDetails,
    };
    res.status(200).send({
      status: resources.status.success,
      message: `Here is the data of order ID ${orderID}`,
      data: allOrderData,
    });
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { getUserOrder };
