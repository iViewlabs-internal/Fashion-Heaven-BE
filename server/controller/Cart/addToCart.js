const Cart = require("../../modles/CartData");
const Product = require("../../modles/ProductData");
const addProduct = async (req, res) => {
  const { SKU, color, size } = req.body;
  try {
    const cartItem = await Product.findOne({ SKU: SKU });
    const newCart = new Cart({
      name: cartItem.name,
      price: price.price,
      size: size,
      SKU: SKU,
      productDetails: cartItem.productDetails,
      picturePath: cartItem.picturePath,
      category: cartItem.category,
      color: color,
      audience: cartItem.audience,
      adminId: cartItem.adminId,
      date: currDate,
    });
    newCart.save();
    console.log(cartItem);
    res.send("Hello world");
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { addProduct };
