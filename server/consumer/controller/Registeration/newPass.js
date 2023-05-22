const Consumer = require("../../models/Consumer");
const bcrypt = require("bcrypt");
const tokenData = require("../../models/tokenData");
const resources = require("../../config/resources");
const changePassword = async (req, res) => {
  let { token, id } = req.params;
  const { password, confirmPassword } = req.body;
  try {
    const userID = id;
    const currUser = await Consumer.find({ _id: userID });
    // console.log(currUser === null);
    let errorFlag = false;
    let errorMessage = "";
    if (currUser.length === 0) {
      errorFlag = true;
      errorMessage = "This user dosen't exits.";
    }
    // console.log(currUser);
    const currToken = await tokenData.find({ token: token });
    if (currToken.length != 0) {
      errorFlag = true;
      errorMessage = "The link here is expired";
    } else {
      if (await bcrypt.compare(password, currUser[0].password)) {
        errorFlag = true;
        errorMessage = "The new password can't be same as the old one.";
      }
      if (password !== confirmPassword) {
        errorFlag = true;
        errorMessage = "Your pasword dosen't match!";
      }
      const hash = async (password, saltRounds) => {
        try {
          const salt = await bcrypt.genSalt(saltRounds);
          return await bcrypt.hash(password, salt);
        } catch (err) {
          console.log("An error has occured " + err);
          return null;
        }
      };
      const hashPassword = await hash(password, 10);
      const update = {
        $set: {
          password: hashPassword,
        },
      };
      const newToken = new tokenData({
        email: currUser[0].email,
        token: token,
      });
      newToken.save();
      const result = await Consumer.updateOne({ _id: userID }, update);
      // console.log(result);
    }
    if (errorFlag === true) {
      res.status(400).send({
        status: resources.status.fail,
        message: errorMessage,
      });
    } else {
      res.status(200).send({
        message: resources.messages.success.updated,
        status: resources.status.success,
        newPass: password,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { changePassword };
