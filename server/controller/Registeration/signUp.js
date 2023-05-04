const User = require("../../modles/UserData");
const bcrypt = require("bcrypt");
const registerData = async (req, res) => {
  let { firstName, lastName, email, password, confirmPassword, phoneNumber } =
    req.body;
  // console.log(confirmPassword === password);
  try {
    //Hash password first
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
    // console.log(hashPassword);
    const isPresentEmail = await User.find({ email: email });
    const isPresentPhoneNo = await User.find({ phoneNumber: phoneNumber });
    if (isPresentEmail.length != 0) {
      console.log("Email ALready Present");
      res.send({ msg: "Email ALready Present", status: "Fail" });
    } else if (isPresentPhoneNo.length != 0) {
      res.send({ msg: "Phone number Already Present", status: "Fail" });
      console.log("Phone number Already Present");
    } else if (confirmPassword != password) {
      res.send({ msg: "Password dosen't match", status: "Fail" });
      console.log("Password dosen't match");
    } else {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        confirmPassword: hashPassword,
        phoneNumber: phoneNumber,
      });
      newUser.save();
      res.send({
        msg: "Your data is inserted sucessfully",
        data: newUser,
        status: "Sucess",
      });
      // res.send("Your data is inserted sucessfully");v
    }
  } catch (err) {
    res.send({ status: "fail", message: `An error has occurred ${err}` });
  }
  //   console.log("Inside the register data route");
};
module.exports = { registerData };
