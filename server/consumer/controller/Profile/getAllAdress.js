const resources = require("../../config/resources");
const Consumer = require("../../models/Consumer");
const getUserAddress = async (req, res) => {
  const consumerID = req.session.passport.user;
  try {
    const consumerData = await Consumer.findOne({ _id: consumerID });
    res.status(200).send({
      status: resources.status.success,
      message: resources.messages.success.fetched,
      data: consumerData.address,
    });
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { getUserAddress };
