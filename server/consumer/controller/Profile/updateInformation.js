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
        status: "success",
        message: `The user with user id ${consumerID} is updated`,
      });
    } else if (isPresentEmail != null) {
      res.status(400).send({
        status: "fail",
        message: `${email} email is already present try again`,
      });
    } else {
      res.status(400).send({
        status: "fail",
        message: `${phoneNumber} phone number is already present try again`,
      });
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { updateInfo };
