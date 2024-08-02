const mongoose = require("mongoose")

const bookingShcema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required :[true, "user id is required"],
    },
    bookingFrom: {
        type: Date,
        required : [true, "Booking from is required"],
    },
    bookingTo: {
        type: Date,
        required : [true, "booking to is required"],
    },
    days: {
        type: Number,
        required : [true, "Booing days is required"]
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'package',
        required :[true, "package id is required"],
    },
    addedServices: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
        required :[true, "service id is required"],
    },
    massage:{
        type: String,
    },
    totalAmount:{
        type: Number,
        required: [true, "Total Amount is required"]
    },
    payment: {
        type: Object,
        default: {
            paymentStatus: {
                Type: Boolean
            },
            paymentMethod: {
                Type: String
            }
        }  
    },
    bookingStatus:{
        type: Boolean,
        default: false
    },
    noOfPerson: {
        type: Number,
        required: [true, "No. of Person is required"]
    },
    bookingTime: {
        type: String,
        default: function(){
            const date =  new Date()
            return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
    }
}, {timestamps:true})

const bookingModule = mongoose.model("booking", bookingShcema)

module.exports = bookingModule