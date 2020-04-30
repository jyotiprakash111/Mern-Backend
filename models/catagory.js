const mongose = require("mongose")

const catagorySchema = new mongose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true,
    }
}, { timestamps: true })

module.exports = mongose.model("Catagory", catagorySchema)