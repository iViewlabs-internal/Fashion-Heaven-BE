const ConsumerCart = require("../../models/ConsumerCart");
const Product = require("../../models/ProductData");
const resources = require("../../config/resources");
const allItems = async (req, res) => {
  try {
    const consumerID = req.session.passport.user;
    const cartItem = await ConsumerCart.find({ consumerID: consumerID });
    let allCartItems = [];
    let subTotalCost = 0;
    for (let i = 0; i < cartItem.length; i++) {
      const productID = cartItem[i].productID;
      const currProductItem = await Product.find({
        _id: productID,
      });
      let inStock = true;
      if (currProductItem[0].quantity < 1) {
        inStock = false;
      }
      console.log(currProductItem);
      let tempItem = {
        productID: productID,
        name: currProductItem[0].name,
        price: currProductItem[0].price,
        image: currProductItem[0].image,
        inStock: inStock,
        size: cartItem[i].size,
      };
      allCartItems.push(tempItem);
      subTotalCost += currProductItem[0].price;
    }
    res.status(200).send({
      status: resources.status.success,
      productData: allCartItems,
      message: resources.messages.success.fetched,
      subTotal: subTotalCost,
    });
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { allItems };
