var express = require('express');
var router = express();
const { check } = require('express-validator');
const { signin, signout, signup, isSignedIn } = require('../controllers/auth');

router.post("/signup", [
    check("name").isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
    check("email").isEmail().withMessage('Email Is Required'),
    check("password").isLength({ min: 4 }).withMessage('Password Must Be at least 4 chars long'),
], signup);

router.post(
    "/signin",
    [
        check("email", "email is required").isEmail(),
        check("password", "password field is required").isLength({ min: 1 })
    ],
    signin
);

router.get("/signout", signout)

// router.get("/testeroute", isSignedIn, (req, res) => {
//     res.json(req.auth);
// })
module.exports = router;
