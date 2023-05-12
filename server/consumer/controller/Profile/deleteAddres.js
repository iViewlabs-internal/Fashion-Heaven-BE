const Consumer = require("../../models/Consumer");
const getDelIndex = (AddresObj, currID) => {
  return (index = AddresObj.findIndex((item) => item._id == currID));
};
const deleteUserAddress = async (req, res) => {
  const consumerID = req.session.passport.user;
  const addressID = req.body.addressID;
  try {
    const consumerData = await Consumer.findOne({ _id: consumerID });
    const delIndex = getDelIndex(consumerData.address, addressID);
    consumerData.address.pull(consumerData.address[delIndex]);
    const delData = await consumerData.save();
    res.status(200).send({
      status: "success",
      message: `Address with ID ${addressID} is deleted`,
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: "fail", message: `An error has occured ${err}` });
  }
};
module.exports = { deleteUserAddress };
