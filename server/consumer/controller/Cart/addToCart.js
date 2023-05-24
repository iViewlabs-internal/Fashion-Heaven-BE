const CunsomerCart = require("../../models/ConsumerCart");
const Product = require("../../models/ProductData");
const resources = require("../../config/resources");
const addProduct = async (req, res) => {
  try {
    const { productID, color, size } = req.body;
    const consumerID = req.session.passport.user;
    const productData = await Product.findOne({ _id: productID });
    if (productData == null) {
      res.status(400).send({
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      });
    } else {
      const newConsumerCart = new CunsomerCart({
        productID: productID,
        consumerID: consumerID,
        size: size,
        color: color,
      });
      newConsumerCart.save();
      // console.log(cartItem);
      res.status(200).send({
        status: resources.status.success,
        data: newConsumerCart,
        message: resources.messages.success.created,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { addProduct };
