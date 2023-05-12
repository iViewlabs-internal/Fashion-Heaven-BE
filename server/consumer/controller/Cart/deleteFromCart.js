const ConsumerCart = require("../../models/ConsumerCart");
const deleteItem = async (req, res) => {
  const productID = req.body.productID;
  try {
    const deleteProduct = await ConsumerCart.deleteOne({
      productID: productID,
    });
    res.status(200).send({
      status: "success",
      data: deleteProduct,
      message: `Product in cart with Product ID: ${productID} is Deleted`,
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { deleteItem };
