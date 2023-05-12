const CunsomerCart = require("../../models/ConsumerCart");
const addProduct = async (req, res) => {
  const { productID, color, size } = req.body;
  const consumerID = req.session.passport.user;
  try {
    const newConsumerCart = new CunsomerCart({
      productID: productID,
      consumerID: consumerID,
      size: size,
      color: color,
    });
    newConsumerCart.save();
    // console.log(cartItem);
    res.status(200).send({
      status: "success",
      data: newConsumerCart,
      message: "Product Added to cart",
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { addProduct };
