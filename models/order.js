const mongose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongose.Schema({
    product: {
        type: ObjectId,
        ref: "Product",
    },
    name: String,
    count: Number,
    price: Number,

});
const ProductCart = mongose.model("ProductCart", ProductCartSchema);


const OrderSchema = new mongose.Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    },

}, { timestamps: true });

const Order = mongose.model("Order", OrderSchema);

module.exports = { Order, ProductCart }