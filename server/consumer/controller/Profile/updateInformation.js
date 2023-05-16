const resources = require("../../config/resources");
const Consumer = require("../../models/Consumer");
const updateInfo = async (req, res) => {
  const consumerID = req.session.passport.user;
  const { firstName, lastName, email, phoneNumber, age } = req.body;
  try {
    const isPresentEmail = await Consumer.findOne({ email: email });
    const isPresentPhoneNumber = await Consumer.findOne({
      phoneNumber: phoneNumber,
    });
    if (isPresentEmail == null && isPresentPhoneNumber == null) {
      const ConsumerData = await Consumer.updateOne(
        { _id: consumerID },
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          age: age,
        }
      );
      res.status(200).send({
        status: resources.status.success,
        message: resources.messages.success.updated,
      });
    } else if (isPresentEmail != null) {
      res.status(400).send({
        status: resources.status.fail,
        message: `${email} email is already present try again`,
      });
    } else {
      res.status(400).send({
        status: resources.status.fail,
        message: `${phoneNumber} phone number is already present try again`,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { updateInfo };
