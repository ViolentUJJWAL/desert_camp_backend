const mongoose = require("mongoose")
const serviceModule = require("./serviceModel")

const packageShcema = new mongoose.Schema({
    stayType: {
        type: String,
        required : [true, "stayType is required"],
    },
    parking: {
        type: Boolean,
        required : [true, "parking or not is required"],
    },
    food: {
        type: Boolean,
        required : [true, "food or not is required"],
    },
    visitingPlaces: {
        type: String,
        required : [true, "visiting Places is required"],
    },
    noOfPerson:{
        type: Number,
        required : [true, "no. of person is required"],
    },
    services:{
        type: Array,
        required: [true, "services is required"],
    },
    message: {
        type: String,
        required: [true, "message is required"]
    },
    noOfBookinginADay: {
        type: Number,
        required: [true, "No. of required booking in a day is required"]
    },
    noOfBooking: {
        type: Array,
        default: {
            date: {
                type: Date
            },
            booking: {
                type: Number
            }
        }
    }
})
const packageModule = mongoose.model("package", packageShcema)

module.exports = packageModule