const ConsumerCart = require("../../models/ConsumerCart");
const Product = require("../../models/ProductData");
const update = async (req, res) => {
  const { productID, size, quantity } = req.body;
  try {
    const product = await Product.findOne({ _id: productID });
    console.log(product);
    if (quantity > product.quantity) {
      res.status(400).send({
        status: "fail",
        message: `Product out of stock. Remaining items ${product.quantity}`,
      });
    } else {
      try {
        const updateData = await ConsumerCart.updateOne(
          { productID: productID },
          { $set: { size: size, quantity: quantity } }
        );
        res.status(200).send({
          status: "success",
          data: updateData,
          message: `Product in cart with productID ${productID} is updated"`,
        });
      } catch (err) {
        res
          .status(500)
          .send({ status: "fail", message: `An error has occurred ${err}` });
      }
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occurred ${err}` });
  }
};

module.exports = { update };
