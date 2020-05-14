const express = require("express");
const router = express.Router();

const {
    getCatagoryById,
    createCatagory,
    getCatagory,
    getAllCatagory,
    updateCatagory,
    removeCatagory
} = require("../controllers/catagory");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserByID } = require("../controllers/user");

// Params 
router.param("userId", getUserByID);
router.param("catagoryId", getCatagoryById);

//  actual Routes Goes here 
// Create Route
router.post(
    "/catagory/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCatagory
);

// Read
router.get("/catagory/:catagoryId", getCatagory)
router.get("/catagories", getAllCatagory)

// update
router.put(
    "/catagory/:catagoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCatagory
);
// delete
router.delete(
    "/catagory/:catagoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeCatagory
);
module.exports = router;
