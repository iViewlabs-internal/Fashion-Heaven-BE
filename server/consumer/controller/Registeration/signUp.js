const Consumer = require("../../models/Consumer");
const transporter = require("../../config/connectEmail");
const bcrypt = require("bcrypt");
const resources = require("../../config/resources");
const registerData = async (req, res) => {
  let { firstName, lastName, email, password, confirmPassword, phoneNumber } =
    req.body;
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
    const isPresentEmail = await Consumer.find({ email: email });
    const isPresentPhoneNo = await Consumer.find({ phoneNumber: phoneNumber });
    if (isPresentEmail.length != 0) {
      // console.log("Email ALready Present");
      res
        .status(400)
        .send({
          message: "Email ALready Present",
          status: resources.status.fail,
        });
    } else if (isPresentPhoneNo.length != 0) {
      res
        .status(400)
        .send({
          message: "Phone number Already Present",
          status: resources.status.fail,
        });
      // console.log("Phone number Already Present");
    } else if (confirmPassword != password) {
      res
        .status(400)
        .send({
          message: "Password dosen't match",
          status: resources.status.fail,
        });
      // console.log("Password dosen't match");
    } else {
      const newConsumer = new Consumer({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        confirmPassword: hashPassword,
        phoneNumber: phoneNumber,
      });
      newConsumer.save();
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: `Welcome to Fashion Heaven ${firstName}`,
          text: `Hello Tanish,\nHope you are having a great day.\nWe would like to welcome to you to our website and thanks for registering with us.\nHere are your relevent info you can always change it whenever you want.\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            res.status(500).send({
              status: resources.status.fail,
              message: resources.messages.error.generic(err),
            });
          } else {
            console.log("Email sent " + info);
          }
        });
      } catch (err) {
        res.status(500).send({
          status: resources.status.fail,
          message: resources.messages.error.generic(err),
        });
      }
      res.status(200).send({
        message: "Your data is inserted sucessfully",
        data: newConsumer,
        status: resources.status.success,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { registerData };
