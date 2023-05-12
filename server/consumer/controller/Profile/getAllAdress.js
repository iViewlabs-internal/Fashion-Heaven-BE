const Consumer = require("../../models/Consumer");
const getUserAddress = async (req, res) => {
  const consumerID = req.session.passport.user;
  try {
    const consumerData = await Consumer.findOne({ _id: consumerID });
    res.status(200).send({
      status: "success",
      message: `The data is sent successfully`,
      data: consumerData.address,
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occures ${err}` });
  }
};
module.exports = { getUserAddress };
