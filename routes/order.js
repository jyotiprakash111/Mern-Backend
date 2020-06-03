const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserByID, PushOrederInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const { getOrderById } = require("../controllers/order");

// Params
router.param("userId", getUserByID);
router.param("userId", getOrderById);
// Actual Routes

module.exports = router;