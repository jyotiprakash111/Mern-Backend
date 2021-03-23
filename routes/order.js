const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserByID, PushOrederInPurchaseList } = require("../controllers/user");
const { createOrder, getOrderById, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/order");
const { updateStock } = require("../controllers/product");


// Params
router.param("userId", getUserByID);
router.param("userId", getOrderById);
// Actual Routes

router.post("/order/create/:userId",
    isSignedIn,
    isAuthenticated,
    PushOrederInPurchaseList,
    updateStock,
    createOrder
);
// Read Routes
router.post("/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders
);

// Status of Order
router.get("/order/sattus/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

module.exports = router;