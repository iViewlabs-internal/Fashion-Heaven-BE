const Product = require("../../models/ProductData");
const resources = require("../../config/resources");
const filter = async (req, res) => {
  const audience = req.query.audience || null;
  const category = req.query.category || null;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const searchObj = { price: { $gte: minPrice, $lte: maxPrice } };
  if (audience != null) {
    searchObj.audience = audience;
  }
  if (category != null) {
    searchObj.category = category;
  }
  try {
    const filterProducts = await Product.find(searchObj);
    res.status(200).send({
      status: resources.messages.success,
      message: `Here is your data that you needed`,
      data: filterProducts,
    });
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};
module.exports = { filter };
