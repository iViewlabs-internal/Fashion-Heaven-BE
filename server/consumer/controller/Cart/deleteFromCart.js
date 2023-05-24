const ConsumerCart = require("../../models/ConsumerCart");
const resources = require("../../config/resources");
const deleteItem = async (req, res) => {
  try {
    const cartItemID = req.body.cartItemID;
    const cartItem = await ConsumerCart.findOne({ _id: cartItemID });
    if (cartItem != null) {
      const deleteProduct = await ConsumerCart.deleteOne({
        _id: cartItemID,
      });
      res.status(200).send({
        status: resources.status.success,
        message: `Product in cart with Cart ID: ${cartItemID} is Deleted`,
      });
    } else {
      res.status(400).send({
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { deleteItem };
