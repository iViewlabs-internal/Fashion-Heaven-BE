const Consumer = require("../../models/Consumer");
const userProfile = async (req, res) => {
  const consumerID = req.session.passport.user;
  try {
    const profile = await Consumer.find({ _id: consumerID });
    console.log(profile);
    res.status(200).send({
      status: "success",
      message: "The data is sent successfully",
      data: profile,
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occured ${err}` });
  }
};
module.exports = { userProfile };
