const Product = require("../../models/ProductData");
const pagination = require("../../middleware/pagination");
const resources = require("../../config/resources");
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const getProduct = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  try {
    const documentCnt = await Product.countDocuments();
    let paginationRes = await pagination.paginatedResults(Product, page, limit);
    paginationRes.result = shuffleArray(paginationRes.result);
    paginationRes.totalData = documentCnt;
    res.send({
      status: resources.status.success,
      message: "Here is the required data",
      data: paginationRes,
    });
  } catch (err) {
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err),
    });
  }
};

module.exports = { getProduct };
