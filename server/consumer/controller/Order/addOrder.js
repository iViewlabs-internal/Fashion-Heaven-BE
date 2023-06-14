const sendMail = require("../Order/sendEmail");
const resources = require("../../config/resources");
const ProductDataServices = require("../../services/ProductDataServices");
const ConsumerService = require("../../services/ConsumerService");
const OrderService = require("../../services/OrderServices");
const buyProduct = async (req, res) => {
  try {
    const { productID, orderDate, size, quantity, color } = req.body;
    const consumerID = req.session.passport.user;
    const orderDateObj = new Date(orderDate);
    const orderStatus = resources.orderPhases.first;
    const productData = await ProductDataServices.getProductByID(productID);
    const ConsumerRequestData = await ConsumerService.consumerDataByID(
      consumerID
    );
    if (ConsumerRequestData.status == resources.status.fail) {
      res.status(500).send({
        status: resources.status.fail,
        message: ConsumerRequestData.message,
      });
    } else {
      const ConsumerData = ConsumerRequestData.data;
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
          const newOrderData = {
            productID: productID,
            orderStatus: orderStatus,
            orderDate: orderDateObj,
            consumerID: consumerID,
            size: size,
            color: color,
            quantity: quantity,
            address: address,
          };
          const newOrderRequest = await OrderService.addOrderByOrderObject(
            newOrderData
          );
          if (newOrderRequest.status == resources.status.fail) {
            res.status(500).send({
              status: resources.status.fail,
              message: newOrderRequest.message,
            });
          } else {
            const newOrder = await newOrderRequest.data;
            newOrder.save();
            const updateProduct =
              await ProductDataServices.updateProductQtyByID(
                productID,
                productData.quantity,
                quantity
              );
            res.status(200).send({
              status: resources.status.success,
              message: "Your order is added successfully",
              data: newOrder,
            });
            sendMail(consumerID, orderStatus);
          }
        }
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
