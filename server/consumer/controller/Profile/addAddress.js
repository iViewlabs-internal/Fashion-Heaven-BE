const Consumer = require("../../models/Consumer");
const resources = require("../../config/resources");
const addToProfile = async (req, res) => {
  const { country, state, city, zipCode, addressLine1, addressLine2 } =
    req.body;
  const consumerID = req.session.passport.user;
  try {
    const consumerData = await Consumer.findOne({ _id: consumerID });
    const consumer = consumerData.address;
    let isAddressPresent = false;
    consumer.forEach((valueObj, index, consumer) => {
      const tempObj = req.body;
      tempObj._id = valueObj._id;
      if (JSON.stringify(valueObj) === JSON.stringify(req.body)) {
        isAddressPresent = true;
      }
    });
    if (isAddressPresent) {
      res.status(400).send({
        status: resources.status.fail,
        message: "This address is already present please try again",
      });
    } else {
      consumer.push({
        country: country,
        state: state,
        city: city,
        zipCode: zipCode,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
      });

      const updatedData = await consumerData.save(); // Save the updated consumer document
      res.status(201).send({
        status: resources.status.success,
        message: resources.messages.success.updated,
        data: updatedData,
      });
    }
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { addToProfile };
