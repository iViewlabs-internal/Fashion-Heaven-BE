const Product = require("../../models/ProductData");
const getProduct = async (req, res) => {
  try {
  } catch (err) {
    res
      .staus(500)
      .send({ status: "fail", message: `An error has occurred: ${err}` });
  }
};

module.exports = { getProduct };
