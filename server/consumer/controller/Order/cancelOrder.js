const sendEmail = require("../Order/sendEmail");
const Order = require("../../models/Order");
const Product = require("../../models/ProductData");
const cancelUserOrder = async (req, res) => {
  const orderID = req.body.orderID;
  try {
    const orderData = await Order.findByIdAndDelete(orderID);
    const productID = orderData.productID;
    const ProductData = await Product.findOne({ _id: productID });
    await Product.updateOne(
      { _id: productID },
      { quantity: ProductData.quantity + orderData.quantity }
    );
    sendEmail(req.session.passport.user, "cancelled");
    res.status(200).send({
      status: "success",
      message: `Order with Order ID ${orderID} is cancelled  `,
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occured ${err}` });
  }
};
module.exports = { cancelUserOrder };
