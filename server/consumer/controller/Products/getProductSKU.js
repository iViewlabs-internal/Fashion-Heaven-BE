const resources = require("../../config/resources");
const Product = require("../../models/ProductData");
const getProduct = async (req, res) => {
  const SKU = req.body.SKU;
  try {
    const prodductData = await Product.findOne({ SKU: SKU });
    if (prodductData == null) {
      res.status(400).send({
        staus: resources.status.fail,
        message: `The product with SKU ${SKU} is not present`,
      });
    } else {
      res.status(200).send({
        staus: resources.status.success,
        message: "Here is the product data you want",
        data: prodductData,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};

module.exports = { getProduct };
