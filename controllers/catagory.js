const Catagory = require("../models/catagory")

exports.getCatagoryById = (req, res, next, id) => {
    Catagory.finById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Catagory not found in DB"
            });
        }
        req.Catagory = cate;
        next();
    })
};

// Ceate new Catagory
exports.createCatagory = (req, res) => {
    console.log("Bala na =============================================");
    const catagory = new Catagory(req.body);
    catagory.save((err, catagory) => {
        if (err) {
            return res.status(400).json({
                error: "Not Able to save Catagory In DB"
            })
        }
        res.json({ catagory })
        console.log("Hyy misss");
    })
}


// get Catagory
exports.getCatagory = (req, res) => {
    return res.json(req.catagory);
}

// Get All Catagory
exports.getAllCatagory = (req, res) => {
    Catagory.find().exec((err, catagories) => {
        if (err) {
            return res.status(400).json({
                error: "No Catagory Found"
            });
        }
        res.json(catagories);
        console.log("Hello");
    })
}

// update catagory
exports.updateCatagory = (req, res) => {
    const catagory = req.catagory;
    catagory.name = req.body.name;

    catagory.save((err, updatedCatagory) => {
        if (err) {
            return res.json(400)({
                error: "Failed to Update Catagory"
            })
        }
        res.json(updatedCatagory)
    })
}

exports.removeCatagory = (req, res) => {
    const catagory = req.catagory;

    catagory.remove((err, catagory) => {
        if (err) {
            return res.json(400)({
                error: "Failed To delete This Catagory"
            })
        }
        res.json({
            message: `Sucessfuly Deleted ${catagory}`
        })
    })
}