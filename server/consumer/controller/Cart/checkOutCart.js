const ConsumerCart = require("../../models/ConsumerCart");
const Order = require("../../models/Order");
const Product = require("../../models/ProductData");
const resources = require("../../config/resources");
const buyAll = async (req, res) => {
  const consumerID = req.session.passport.user;
  try {
    const consumerCartOrders = await ConsumerCart.find({
      consumerID: consumerID,
    });
    let isRemaining = false;
    let reamainingItem = [];
    let inStockItems = [];
    for (let i = 0; i < consumerCartOrders.length; i++) {
      const productData = await Product.findOne({
        _id: consumerCartOrders[i].productID,
      });
      if (productData.quantity < consumerCartOrders[i].quantity) {
        isRemaining = true;
        reamainingItem.push({
          productID: productData._id,
          reaminingStock: productData.quantity,
        });
      } else {
        inStockItems.push(consumerCartOrders[i]);
      }
    }
    if (isRemaining) {
      res.status(400).send({
        status: "fail",
        message: "Not all items are in stock try again",
        reamainingItem: reamainingItem,
      });
    } else {
      for (let i = 0; i < inStockItems.length; i++) {
        const orderData = {
          productID: inStockItems[i].productID,
          orderDate: new Date(),
          orderStatus: inStockItems[i].orderStatus,
          consumerID: consumerID,
          size: inStockItems[i].size,
          quantity: inStockItems[i].quantity,
          color: inStockItems[i].color,
        };
        const productData = await Product.findOne({
          _id: inStockItems[i].productID,
        });
        const updateProduct = await Product.updateOne(
          { _id: inStockItems[i].productID },
          { quantity: productData.quantity - inStockItems[i].quantity }
        );
        Order.create(orderData);
        const deleteFromCart = await ConsumerCart.deleteOne({
          _id: inStockItems[i]._id,
        });
      }
      res.status(200).send({
        status: resources.status.success,
        message: "All the cart items have been ordered",
        orderedItems: inStockItems,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { buyAll };
