const express = require('express');
const router = express.Router();

const { getProcuctById, createProduct, getProduct, photo } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserByID } = require("../controllers/user");

// all of params
router.param("userId", getUserByID);
router.param("productId", getProcuctById);

// all of actual routes
router.post("/product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct
);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

module.exports = router;
