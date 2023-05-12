const Order = require("../../models/Order");
const Product = require("../../models/ProductData");
const getOrderDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0"); // Get the day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month (Note: Month starts from 0) and pad with leading zero if necessary
  const year = date.getFullYear(); // Get the full year

  return (formattedDate = `${day}/${month}/${year}`);
};
const getUserOrders = async (req, res) => {
  const consumerID = req.session.passport.user;
  try {
    const userOrders = await Order.find({ consumerID: consumerID });
    let allUserOrder = [];
    for (let i = 0; i < userOrders.length; i++) {
      const productData = await Product.findOne({
        _id: userOrders[i].productID,
      });
      let currObj = {};
      currObj.orderID = userOrders[i]._id;
      currObj.name = productData.name;
      currObj.orderDate = userOrders[i].orderDate;
      currObj.image = productData.image;
      currObj.orderStatus = userOrders[i].orderStatus;
      allUserOrder.push(currObj);
    }
    res.status(200).send({
      status: "success",
      message: `Here is all the orders by id ${consumerID}`,
      data: allUserOrder,
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occures ${err}` });
  }
};
module.exports = { getUserOrders };
