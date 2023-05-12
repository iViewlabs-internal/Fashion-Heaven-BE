const Order = require("../../models/Order");
const sendEmail = require("../Order/sendEmail");
const updateData = async (req, res) => {
  const { orderID, orderStatus } = req.body;
  try {
    const updateOrderData = await Order.findOneAndUpdate(
      { _id: orderID },
      { orderStatus: orderStatus }
    );
    sendEmail(updateOrderData.consumerID, orderStatus);
    res.status(200).send({
      status: "success",
      message: `The order with order ID ${orderID} has been updated`,
      data: updateOrderData,
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occured ${err}` });
  }
};
module.exports = { updateData };
