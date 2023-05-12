const Order = require("../../models/Order");
const Product = require("../../models/ProductData");
const sendMail = require("../Order/sendEmail");
const buyProduct = async (req, res) => {
  const { productID, orderDate, size, quantity, color } = req.body;
  const consumerID = req.session.passport.user;
  const orderDateObj = new Date(orderDate);
  const orderStatus = "Order Confirmed";
  try {
    const newOrder = new Order({
      productID: productID,
      orderStatus: orderStatus,
      orderDate: orderDateObj,
      consumerID: consumerID,
      size: size,
      color: color,
      quantity: quantity,
    });
    newOrder.save();
    const productData = await Product.findOne({ _id: productID });
    const updateProduct = await Product.updateOne(
      { _id: productID },
      { quantity: productData.quantity - quantity }
    );
    res.status(200).send({
      status: "success",
      message: "Your order is added successfully",
      data: newOrder,
    });
    sendMail(consumerID, orderStatus);
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occured ${err}` });
  }
};
module.exports = { buyProduct };
