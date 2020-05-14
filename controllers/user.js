const User = require("../models/user");
const Order = require("../models/order");

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

// Save Updated data in db
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
            // user.encry_password = undefined;
            res.json(user)
            console.log("update User");
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No order in this account"
                })
            }
            return res.json(order);
        })
}


// Push Oreder in purchaseList
exports.PushOrederInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            catagory: product.catagory,
            quantity: product.quantity,
            amount: req.body.order.amount,
            tranction_id: req.body.order.tranction_id,

        })
    })

    // Store the data in DB
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save Purchase List"
                })
            }
            next();
        }
    );
}