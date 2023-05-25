const Order = require("../../models/Order");
const Product = require("../../models/ProductData");
const sendMail = require("../Order/sendEmail");
const resources = require("../../config/resources");
const Consumer = require("../../models/Consumer");
const buyProduct = async (req, res) => {
  try {
    const { productID, orderDate, size, quantity, color } = req.body;
    const consumerID = req.session.passport.user;
    const orderDateObj = new Date(orderDate);
    const orderStatus = "Order Confirmed";
    const productData = await Product.findOne({ _id: productID });
    const ConsumerData = await Consumer.findOne({ _id: consumerID });
    if (productData == null) {
      res.status(400).send({
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      });
    } else if (ConsumerData.address.length == 0) {
      res.status(400).send({
        status: resources.status.fail,
        message: `Please add atleast one address first then order`,
      });
    } else {
      if (productData.quantity < quantity) {
        res.status(400).send({
          status: resources.status.fail,
          message: `The item with item id ${productData._id} is not in stock`,
        });
      } else {
        const address = ConsumerData.address[0];
        const newOrder = new Order({
          productID: productID,
          orderStatus: orderStatus,
          orderDate: orderDateObj,
          consumerID: consumerID,
          size: size,
          color: color,
          quantity: quantity,
          address: address,
        });
        newOrder.save();
        const updateProduct = await Product.updateOne(
          { _id: productID },
          { quantity: productData.quantity - quantity }
        );
        res.status(200).send({
          status: resources.status.success,
          message: "Your order is added successfully",
          data: newOrder,
        });
        sendMail(consumerID, orderStatus);
      }
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { buyProduct };
