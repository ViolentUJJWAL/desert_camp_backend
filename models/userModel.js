const mongoose = require("mongoose")

const userShcema = new mongoose.Schema({
    name: {
        type: String,
        required :[true, "Name is required"],
    },
    email: {
        type: String,
        required : [true, "E-Mail is required"],
        unique: true
    },
    phoneNo: {
        type: String,
        required : [true, "Phone number is required"],
        unique: true
    },
    password: {
        type: String,
        required : [true, "Password is required"]
    },
    role:{
        type: String,
        default: "user"
    },
    booking: {
        type: Array,
        default: []
    },
    paymentMethod: {
        type: Object,
        default: {}  
    },

    date: {
        type: String,
        default: function(){
            const date =  new Date()
            return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
    }
}, {timestamps:true})

const userModule = mongoose.model("user", userShcema)

module.exports = userModule