const ConsumerCart = require("../../models/ConsumerCart");
const Product = require("../../models/ProductData");
const resources = require("../../config/resources");
const update = async (req, res) => {
  try {
    const { productID, size, quantity } = req.body;
    const productData = await Product.findOne({ _id: productID });
    if (productData == null) {
      res.status(400).send({
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      });
    } else {
      const product = await Product.findOne({ _id: productID });
      if (quantity > product.quantity) {
        res.status(400).send({
          status: resources.status.fail,
          message: `Product out of stock. Remaining items ${product.quantity}`,
        });
      } else {
        try {
          const updateData = await ConsumerCart.updateOne(
            { productID: productID },
            { $set: { size: size, quantity: quantity } }
          );
          res.status(200).send({
            status: resources.status.success,
            data: updateData,
            message: resources.messages.success.updated,
          });
        } catch (err) {
          res.status(500).send({
            status: resources.status.fail,
            message: resources.messages.error.generic(err),
          });
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

module.exports = { update };
