const resources = require("../../config/resources");
const Consumer = require("../../models/Consumer");
const userProfile = async (req, res) => {
  console.log(req.session);
  try {
    const consumerID = req.session.passport.user;
    const profile = await Consumer.find({ _id: consumerID });
    console.log(profile);
    res.status(200).send({
      status: resources.status.success,
      message: resources.messages.success.fetched,
      data: profile,
    });
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { userProfile };
