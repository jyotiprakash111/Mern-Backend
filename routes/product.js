const express = require('express');
const router = express.Router();

const { getProcuctById,
    createProduct,
    getProduct,
    photo,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product");
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

// Read Route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// Delete Route
router.delete("/product/productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
);
// Update Route
router.put("product/productId/:iserId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
);

// lIsting Route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
