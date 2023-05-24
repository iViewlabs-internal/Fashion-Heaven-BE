const Order = require("../../models/Order");
const sendEmail = require("../Order/sendEmail");
const resources = require("../../config/resources");
const updateData = async (req, res) => {
  try {
    const { orderID, orderStatus } = req.body;
    const updateOrderData = await Order.findOneAndUpdate(
      { _id: orderID },
      { orderStatus: orderStatus }
    );
    if (updateOrderData == null) {
      res.status(400).send({
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      });
    } else {
      sendEmail(updateOrderData.consumerID, orderStatus);
      res.status(200).send({
        status: resources.status.success,
        message: `The order with order ID ${orderID} has been updated`,
        data: updateOrderData,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { updateData };
