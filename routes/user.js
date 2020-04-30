const express = require("express")
const router = express.Router();

const { getUserByID, getUser, getAllUsers, updateUser } = require('../controllers/user')
const { isSignedIn, isAuthenticated, isAdmin, } = require('../controllers/auth')

router.param("userId", getUserByID);
router.param("userId", getAllUsers);


router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/getalluser", getAllUsers);

// Update User Info
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)
module.exports = router;