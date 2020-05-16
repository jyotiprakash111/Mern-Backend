const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


// Signup Api
exports.signup = (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save user in DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            password: user.encry_password,
            id: user._id
        });
    });
};

exports.signin = (req, res) => {
    const errors = validationResult(req)
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User Email Does not Exist"
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password do not Match"
            })
        }
        // create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        // Put token into cookie
        res.cookie("token", token, { expire: new Date() + 9999 })

        // sent Response to frontend
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } })
    })
}
exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User signout Successfully"
    });
};


// Protected Route
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

// Custom Middleware

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    console.log("Baby i need ya");
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "YOU ARE NOT ADMIN, ACCESS DENIED"
        })
    }
    next();
}