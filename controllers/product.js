const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProcuctById = (req, res, next, id) => {
    Product.findById(id)
        .populate("catagory")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "No Product Found"
                });
            }
            req.product = product;
            next();
            // console.log("Populated User " + category);
        });
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    console.log("Hello Jyoti");
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem With Image"
            });
        };

        // Destructre the fields
        const { name, description, price, category, stock } = fields;
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "Please Include All Fields"
            });
        }

        let product = new Product(fields)
        // handle files here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File Size Is Too Big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        console.log(product);


        // save to DB
        product.save((err, product) => {
            if (err) {
                res.status(400).json({
                    error: "Saving tshirt in DB Failed"
                })
            }
            res.json(product);
        });
    });
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

//middleware
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

// Delete controllers
exports.deleteProduct = (req, res,) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to Delete The Product"
            })
        }
        res.json({
            message: "Product Deleted successfully",
            deletedProduct
        })
    })
};

// Update Controller
exports.updateProduct = (req, res,) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    console.log("Hello Update Product Api");

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem With Image"
            });
        };

        // Updation Code
        let product = req.product;
        product = _.extend(product, fields)
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File Size Is Too Big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        console.log(product);


        // save to DB
        product.save((err, product) => {
            if (err) {
                res.status(400).json({
                    error: "Updation of Product Failed"
                })
            }
            res.json(product);
        });
    });
}

// Product Listing
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    // .select("photo")
        .select("-photo")
        .populate("catagory")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "No Product Found"
                })
            }
            res.json(products);
        })
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("catagory", {}, (err, catagory) => {
        if (err) {
            return res.status(400).json({
                error: "No Category Found"
            })
        }
        res.json(catagory);
    })
}

exports.updateStock = (req, res, next) => {
    let myOperatins = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: +prod.count } }
            }
        }
    })

    Product.bulkWrite(myOperatins, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk Operation Failed"
            });
        }
        next();
    })
}