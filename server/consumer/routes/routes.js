const express = require("express");
const router = express.Router();
const signup = require("../controller/Registeration/signUp");
const passport = require("passport");
const Consumer = require("../models/Consumer");
const forgetPass = require("../controller/Registeration/forgotPass");
const newPass = require("../controller/Registeration/newPass");
const productFilter = require("../controller/Products/productFilter");
const checkLogin = require("../config/checkLogin");
const addToCart = require("../controller/Cart/addToCart");
const getCartItems = require("../controller/Cart/getCartItems");
const updateCart = require("../controller/Cart/updateCart");
const deleteFromCart = require("../controller/Cart/deleteFromCart");
const getFeedItems = require("../controller/Products/getFeedProducts");
const getBySKU = require("../controller/Products/getProductSKU");
const getUserProfile = require("../controller/Profile/getUserProfile");
const addAddress = require("../controller/Profile/addAddress");
const getAllAddress = require("../controller/Profile/getAllAdress");
const deleteAddress = require("../controller/Profile/deleteAddres");
const updateDetailes = require("../controller/Profile/updateInformation");
const addOrder = require("../controller/Order/addOrder");
const updateOrder = require("../controller/Order/updateOrder");
const getAllOrders = require("../controller/Order/getAllOrder");
const getOrderByID = require("../controller/Order/getOrderByID");
const cancelOrder = require("../controller/Order/cancelOrder");
const filterOrders = require("../controller/Order/filterOrders");
const checkOutCart = require("../controller/Cart/checkOutCart");
const searchProduct = require("../controller/Products/searchProduct");
const updateAddress = require("../controller/Profile/updateAddress");
const addReview = require("../controller/Review/addReview");
const getAllReview = require("../controller/Review/getAllReview");
const deleteReview = require("../controller/Review/deleteReview");
const updateReview = require("../controller/Review/updateReview");
router.get("/", (req, res) => {
  res.status(201).send({
    status: "success",
    message: "The setup of backend server is successful",
  });
});
// Registeration of Consumer:
router.post("/signup", signup.registerData);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure",
    failureFlash: true,
  })
);
router.get("/success", async (req, res) => {
  const currID = req.session.passport.user;
  try {
    const ConsumerData = await Consumer.findOne({ _id: currID });
    res.status(200).send({ data: ConsumerData, staus: "success" });
  } catch (err) {
    res.status(500).send({
      staus: "fail",
      message: `An error has occured ${err}`,
    });
  }
});
router.get("/failure", (req, res) => {
  res.status(403).send({ status: "fail" });
});
router.post("/forget", forgetPass.resetPass);
router.post("/reset/:token/:id", newPass.changePassword);
// Profile API
router.get("/getUser", checkLogin.isAuthenticated, getUserProfile.userProfile);
router.post("/addAddress", checkLogin.isAuthenticated, addAddress.addToProfile);
router.get(
  "/getUserAddress",
  checkLogin.isAuthenticated,
  getAllAddress.getUserAddress
);
router.post(
  "/deleteAddress",
  checkLogin.isAuthenticated,
  deleteAddress.deleteUserAddress
);
router.post(
  "/updateConsumer",
  checkLogin.isAuthenticated,
  updateDetailes.updateInfo
);
router.post(
  "/updateAddress",
  checkLogin.isAuthenticated,
  updateAddress.updateProfile
);
//Product API
router.get("/productFilter", checkLogin.isAuthenticated, productFilter.filter);
router.get(
  "/feedProducts/:page?/:limit?",
  checkLogin.isAuthenticated,
  getFeedItems.getProduct
);
router.post("/getBySKU", checkLogin.isAuthenticated, getBySKU.getProduct);
router.get(
  "/searchProduct/:keyword?",
  checkLogin.isAuthenticated,
  searchProduct.getItem
);
// Cart API
router.post("/addToCart", checkLogin.isAuthenticated, addToCart.addProduct);
router.get("/getCartItems", checkLogin.isAuthenticated, getCartItems.allItems);
router.post(
  "/deleteCartItem",
  checkLogin.isAuthenticated,
  deleteFromCart.deleteItem
);
router.post("/checkOutCart", checkLogin.isAuthenticated, checkOutCart.buyAll);
router.post("/updateCart", checkLogin.isAuthenticated, updateCart.update);
// Order API
router.post("/addOrder", checkLogin.isAuthenticated, addOrder.buyProduct);
router.post("/updateOrder", checkLogin.isAuthenticated, updateOrder.updateData);
router.get(
  "/getAllOrders",
  checkLogin.isAuthenticated,
  getAllOrders.getUserOrders
);
router.post(
  "/getOrderByID",
  checkLogin.isAuthenticated,
  getOrderByID.getUserOrder
);
router.post(
  "/cancelOrder",
  checkLogin.isAuthenticated,
  cancelOrder.cancelUserOrder
);
router.post(
  "/filterOrders",
  checkLogin.isAuthenticated,
  filterOrders.filterUserOrders
);
// Review API
router.post(
  "/addReview",
  checkLogin.isAuthenticated,
  addReview.addProductReview
);
router.post(
  "/getReview",
  checkLogin.isAuthenticated,
  getAllReview.getProductReview
);
router.post(
  "/deleteReview",
  checkLogin.isAuthenticated,
  deleteReview.deleteProductReview
);
router.post(
  "/updateReview",
  checkLogin.isAuthenticated,
  updateReview.updateProductReview
);
module.exports = router;
