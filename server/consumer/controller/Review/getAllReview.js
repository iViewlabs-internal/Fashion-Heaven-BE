const Product = require("../../models/ProductData");
const resources = require("../../config/resources");
const getProductReview = async (req, res) => {
  try {
    const productID = req.body.productID;
    const productData = await Product.findOne({ _id: productID });
    if (productData == null) {
      res.status(400).send({
        status: resources.status.fail,
        message: "This product dosen't exits",
      });
    } else {
      res.status(200).send({
        status: resources.status.success,
        message: resources.messages.success.fetched,
        data: productData.reviews,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { getProductReview };
