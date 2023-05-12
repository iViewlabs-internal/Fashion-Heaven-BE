const ConsumerCart = require("../../models/ConsumerCart");
const Product = require("../../models/ProductData");
const allItems = async (req, res) => {
  const consumerID = req.session.passport.user;
  try {
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
    res.send({
      status: "success",
      productData: allCartItems,
      message: "Here are all the products that you need",
      subTotal: subTotalCost,
    });
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { allItems };
