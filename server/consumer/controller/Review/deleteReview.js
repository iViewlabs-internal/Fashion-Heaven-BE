const resources = require("../../config/resources");
const Product = require("../../models/ProductData");
const deleteProductReview = async (req, res) => {
  try {
    const { reviewID, productID } = req.body;
    const productData = await Product.findOne({ _id: productID });
    if (productData == null) {
      res.status(400).send({
        status: resources.status.fail,
        message: "This Product ID is incorrect",
      });
    } else {
      const reviewData = productData.reviews;
      const delIndex = reviewData.find((obj) => obj._id == reviewID);
      console.log(delIndex);
      if (delIndex == -1) {
        res.status(400).send({
          status: resources.status.fail,
          message: "This review ID is incorrect",
        });
      } else {
        reviewData.splice(delIndex, 1);
        res.status(200).send({
          status: resources.status.success,
          message: resources.messages.success.deleted,
        });
        productData.save();
      }
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { deleteProductReview };
