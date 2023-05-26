const Product = require("../../models/ProductData");
const Order = require("../../models/Order");
const resources = require("../../config/resources");
const addProductReview = async (req, res) => {
  try {
    let errorStatusCode, errorSatusMessage;
    let errorFlag = true;
    const { productID, reviewDescription, orderID, rating } = req.body;
    const consumerID = req.session.passport.user;
    const orderData = await Order.findOne({ _id: orderID });
    if (orderData == null) {
      errorFlag = false;
      errorSatusMessage = "Bad request you haven't ordered this product";
      errorStatusCode = 400;
    }
    if (orderData != null && orderData.orderStatus != "Delivered") {
      errorFlag = false;
      errorSatusMessage =
        "You cannot write a review yet you need the product to be delivered";
      errorStatusCode = 400;
    }
    if (errorFlag == false) {
      res.status(errorStatusCode).send({
        status: resources.status.fail,
        message: errorSatusMessage,
      });
    } else {
      const productData = await Product.findOne({ _id: productID });
      let reviewData = productData.reviews;
      reviewData.push({
        rating: rating,
        reviewDescription: reviewDescription,
        consumerID: consumerID,
      });
      const updatedData = await productData.save();
      res.status(200).send({
        status: resources.status.success,
        message: resources.messages.success.created,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { addProductReview };
