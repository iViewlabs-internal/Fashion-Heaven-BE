const resources = require("../../config/resources");
const Product = require("../../models/ProductData");
const updateProductReview = async (req, res) => {
  try {
    const { productID, reviewID, reviewDescription, rating } = req.body;
    const consumerID = req.session.passport.user;
    const productData = await Product.findOne({ _id: productID });
    const updatedData = {
      rating: rating,
      reviewDescription: reviewDescription,
      consumerID: consumerID,
    };
    if (productData == null) {
      res.status(400).send({
        status: resources.status.fail,
        message: "This Product ID is incorrect",
      });
    } else {
      const reviewData = productData.reviews;
      const updateIndex = reviewData.findIndex(
        (review) => review._id == reviewID
      );
      console.log(updateIndex);
      if (updateIndex == -1) {
        res.status(400).send({
          status: resources.status.fail,
          message: "This review ID is incorrect",
        });
      } else {
        reviewData[updateIndex] = updatedData;
        res.status(200).send({
          status: resources.status.success,
          message: resources.messages.success.updated,
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
module.exports = { updateProductReview };
