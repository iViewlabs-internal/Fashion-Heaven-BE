const Order = require("../../models/Order");
const filterUserOrders = async (req, res) => {
  const { filterMonth, filterYear } = req.body;
  const consumerID = req.session.passport.user;
  try {
    let currDate = new Date();
    if (filterMonth.length == 0) {
      currDate.setFullYear(currDate.getFullYear() - filterYear);
      const startDate = new Date(`${currDate.getFullYear()}-01-01`);
      const endDate = new Date(`${currDate.getFullYear()}-12-31`);
      const Orderdata = await Order.find({
        consumerID: consumerID,
        orderDate: { $lt: endDate, $gt: startDate },
      });
      res.status(200).send({
        status: "success",
        message: "Your data is filtered successfully",
        data: Orderdata,
      });
    } else if (filterYear.length == 0) {
      const startDate = new Date();
      const endDate = new Date();
      if (filterMonth == "3") {
        startDate.setMonth(startDate.getMonth() - 3);
      } else {
        startDate.setMonth(startDate.getMonth() - 6);
      }
      const Orderdata = await Order.find({
        consumerID: consumerID,
        orderDate: { $lt: endDate, $gt: startDate },
      });
      res.status(200).send({
        status: "success",
        message: "Your data is filtered successfully",
        data: Orderdata,
      });
    } else {
      res
        .status(400)
        .send({ status: "fail", message: `The input is in the wrong format` });
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occured ${err}` });
  }
};
module.exports = { filterUserOrders };
