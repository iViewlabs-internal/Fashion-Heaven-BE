const User = require("../../modles/UserData");
const bcrypt = require("bcrypt");
const changePassword = async (req, res) => {
  let { token } = req.params;
  const { password, confirmPassword } = req.body;
  console.log(token);
  if (token) {
    const userID = token;

    try {
      const currUser = await User.find({ _id: userID });
      if (currUser == null) {
        res.send({ result: "This user dosen't exits.", status: "fail" });
      }
      if (await bcrypt.compare(password, currUser[0].password)) {
        res.send({
          result: "The new password can't be same as the old one.",
          status: "fail",
        });
      }
      if (password !== confirmPassword) {
        res.send({ result: "Your pasword dosen't match!", status: "fail" });
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
      const result = await User.updateOne({ _id: userID }, update);
      console.log(result);
      res.send({
        result: "Password is updated Sucessfully!",
        status: "success ",
        newPass: password,
      });
    } catch (err) {
      console.error("Inside catch");
    }
  } else {
    res.send({ result: "Please enter a token", status: "fail" });
  }
};
module.exports = { changePassword };
