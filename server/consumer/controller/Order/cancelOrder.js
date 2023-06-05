const sendEmail = require("../Order/sendEmail");
const resources = require("../../config/resources");
const ProductDataServices = require("../../services/ProductDataServices");
const OrderService = require("../../services/OrderServices");

const cancelUserOrder = async (req, res) => {
  try {
    const orderID = req.body.orderID;
    const orderDataRequest = await OrderService.updateOrderByOrderID(orderID, {
      orderStatus: resources.orderPhases.cancel,
    });
    if (orderDataRequest.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: orderDataRequest.message,
      });
    } else {
      const orderData = orderDataRequest.data;
      if (orderData == null) {
        res.status(400).send({
          status: resources.status.fail,
          message: resources.messages.error.notFound,
        });
      } else {
        const productID = orderData.productID;
        const ProductData = await ProductDataServices.getProductByID(productID);
        await ProductDataServices.updateProductAddProduct(
          productID,
          ProductData.quantity,
          orderData.quantity
        );
        sendEmail(req.session.passport.user, "cancelled");
        res.status(200).send({
          status: resources.status.success,
          message: `Order with Order ID ${orderID} is cancelled  `,
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { cancelUserOrder };
