const resources = require("../../../config/resources");
const Product = require("../../../models/ProductData");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Order = require("../../../models/Order");
const userOrder = async (req, res) => {
  try {
    const consumerID = req.session.passport.user;
    const userOrdersID = req.body.userOrdersID;
    if (userOrdersID == null) {
      res.status(400).send({
        status: resources.status.fail,
        message: `Bad Request Please Atleast One Item`,
      });
    } else {
      let lineItemsRes = [];
      for (let i = 0; i < userOrdersID.length; i++) {
        const orderData = await Order.findOne({ _id: userOrdersID[i] });
        const productData = await Product.findOne({ _id: orderData.productID });
        let currObj = {
          price_data: {
            currency: "usd",
            unit_amount: productData.price * 100,
            product_data: {
              name: productData.name,
              description: productData.productDetails,
            },
          },
          quantity: orderData.quantity,
        };
        lineItemsRes.push(currObj);
      }
      console.log(lineItemsRes);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItemsRes,
        success_url: `${process.env.CLIENT_URL}/success.html`,
        cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
      });
      res.json({ url: session.url });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { userOrder };
