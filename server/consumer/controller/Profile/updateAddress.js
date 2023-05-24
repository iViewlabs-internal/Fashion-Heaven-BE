const Consumer = require("../../models/Consumer");
const resources = require("../../config/resources");
const updateProfile = async (req, res) => {
  try {
    const {
      country,
      state,
      city,
      zipCode,
      addressLine1,
      addressLine2,
      addressId,
    } = req.body;
    const updatedAddress = {
      country: country,
      state: state,
      city: city,
      zipCode: zipCode,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
    };
    const consumerID = req.session.passport.user;
    const consumerdata = await Consumer.findOne({ _id: consumerID });
    let flag = false;
    const consumerAddress = consumerdata.address;
    for (let i = 0; i < consumerAddress.length; i++) {
      if (addressId == consumerAddress[i]._id) {
        console.log(consumerdata.address[i], "Previous Data");
        console.log(updatedAddress, "newData");
        consumerdata.address[i] = updatedAddress;
        consumerdata.save();
        console.log("Data Updated");
        flag = true;
      }
    }
    if (flag) {
      res.status(200).send({
        status: resources.status.success,
        message: resources.messages.success.updated,
      });
    } else {
      res.status(400).send({
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { updateProfile };
