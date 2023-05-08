const Cart = require("../../modles/CartData");
const allItems = async (req, res) => {
  const UserID = req.session.passport.user;
  try {
    const cartItem = await Cart.find({ UserID: UserID });
    res.send({
      status: "success",
      data: cartItem,
      message: "Product Added to cart",
    });
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { allItems };
