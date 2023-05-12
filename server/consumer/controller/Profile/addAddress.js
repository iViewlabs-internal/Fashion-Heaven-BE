const Consumer = require("../../models/Consumer");
const addToProfile = async (req, res) => {
  const { country, state, city, zipCode, addressLine1, addressLine2 } =
    req.body;
  const consumerID = req.session.passport.user;
  try {
    const consumerData = await Consumer.findOne({ _id: consumerID });
    const consumer = consumerData.address;

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
      status: "success",
      message: "The data is updated",
      data: updatedData,
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occurred ${err}` });
  }
};
module.exports = { addToProfile };
