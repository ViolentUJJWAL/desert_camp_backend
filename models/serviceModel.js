const mongoose = require("mongoose")

const serviceShcema = new mongoose.Schema({
    serviceName: {
        type: String,
        required : [true, "Service Name is required"],
    },
    price: {
        type: Number,
        required : [true, "price is required"],
    },
    days: {
        type: Number,
        default: 1
    }
})
const serviceModule = mongoose.model("service", serviceShcema)

module.exports = serviceModule