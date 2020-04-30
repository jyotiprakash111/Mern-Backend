const User = require("../models/user");

exports.getUserByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user;
        next();
    })
}

// Optional get all User
exports.getAllUsers = (req, res) => {
    User.find().exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not Found Biki"
            })
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user)
        console.log("Data Received");
    })

}

exports.getUser = (req, res) => {
    TODO:// get back here for password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile)
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to Update User Info"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user)
            console.log("Hello");

        }
    )
}