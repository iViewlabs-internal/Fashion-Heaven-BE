const ConsumerCart = require("../../models/ConsumerCart");
const Order = require("../../models/Order");
const Product = require("../../models/ProductData");
const buyAll = async (req, res) => {
  const consumerID = req.session.passport.user;
  try {
    const consumerCartOrders = await ConsumerCart.find({
      consumerID: consumerID,
    });
    for (let i = 0; i < consumerCartOrders.length; i++) {
      const orderData = {
        productID: consumerCartOrders[i].productID,
        orderDate: new Date(),
        orderStatus: consumerCartOrders[i].orderStatus,
        consumerID: consumerID,
        size: consumerCartOrders[i].size,
        quantity: consumerCartOrders[i].quantity,
        color: consumerCartOrders[i].color,
      };
      const productData = await Product.findOne({
        _id: consumerCartOrders[i].productID,
      });
      const updateProduct = await Product.updateOne(
        { _id: consumerCartOrders[i].productID },
        { quantity: productData.quantity - consumerCartOrders[i].quantity }
      );
      Order.create(orderData);
    }
    res.send(consumerCartOrders);
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occured ${err}` });
  }
};
module.exports = { buyAll };
