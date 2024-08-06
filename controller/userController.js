const userModule = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const secret_key = process.env.SK_KEY
// const nodemailer = require("nodemailer")

// SignupUser => name, userName, email, password
exports.SignupUser = async (req, res) => {
    try {
        const { name, email,phoneNo, password, confirmPassword } = req.body

        // check all fields is present
        if ( !name || !email || !password || !phoneNo || !confirmPassword) {
            return res.status(400).send({
                msg: "please fill all fields",
                success: false,
            })
        }

        // check user is unique
        const existUserbyemail = await userModule.find({ email: { $eq: email } })
        if (existUserbyemail.length > 0) {
            return res.status(400).send({
                msg: `error User aleady exist`,
                success: false,
                error: `Email`,
            })
        }

        if(!(password === confirmPassword)){
            return res.status(400).send({
                msg: "password and confirm password not match",
                success: false,
            })
        }
        
        // pasword to HashPassword
        const HashPassword = await bcrypt.hash(password, 10, async function (err, hash) {
            // ckech error
            if (err) {
                return res.status(500).send({
                    msg: "Internal server err",
                    success: false,
                    error: err
                })
            }

            // data are save in DB
            try{
                const userData = await new userModule({ name, email, password: hash, phoneNo }).save()
                console.log(userData)
                return res.status(201).send({
                    msg: "user created successfully",
                    success: true,
                    data: userData
                })
            }catch(err){
                return res.status(500).send({
                    msg: "Database error",
                    success: false,
                    error: err,
                })
            }
        })
    }
    catch (err) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${err}\n)`)
        return res.status(500).send({
            msg: "error in SingupUser",
            success: false,
            error: err,
        })
    }
}


// loginUser => userName, password
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // check all fields is present
        if (!email | !password) {
            return res.status(400).send({
                msg: "please fill all fields",
                success: false,
            })
        }

        // find user in database
        const findUser = await userModule.findOne({ email: { $eq: email } })
        if (findUser.length === 0) {
            return res.status(404).send({
                msg: "User not found",
                success: false,
            })
        }

        // check user password
        const checkIsUser = await bcrypt.compare(password, findUser.password, async function (err, result) {
            if (err) {
                return res.status(500).send({
                    msg: "Internal server err",
                    success: false,
                    error: err
                })
            }

            // if password is worng
            if (result === false) {
                return res.status(403).send({
                    msg: "Wrong password",
                    success: false,
                })
            }

            // confirm password and send res.
            // create JWT signature
            let token = jwt.sign({ id: findUser._id }, secret_key)
            console.log(token)
            res.cookie("token", token, {maxAge: 9000000, httpOnly: true, secure: true})
            return res.status(200).send({
                msg: "Log in successfully",
                success: true,
                data: findUser
            })
        })
    }
    catch (err) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${err}\n)`)
        return res.status(500).send({
            msg: "error in loginUser",
            success: false,
            error: err,
        })
    }
}

exports.getProfile = async(req, res)=>{
    try{
        const id = req.user
        const findUser = await userModule.findOne({ _id: { $eq: id } })
        if (findUser.length === 0) {
            return res.status(404).send({
                msg: "User not found",
                success: false,
            })
        }
        return res.status(200).send({
            success: true,
            user: findUser
        })
    }
    catch(err){
        console.log(`error in this req (\n${req}\n)\nerror is (\n${err}\n)`)
        return res.status(500).send({
            msg: "error in getProfile",
            success: false,
            error: err,
        })
    }
}

exports.updateProfile = async(req, res)=>{
    try{
        const newData = req.body
        const id = req.user
        const findUser = await userModule.findOne({ _id: { $eq: id } })
        if (findUser.length === 0) {
            return res.status(404).send({
                msg: "User not found",
                success: false,
            })
        }
        if(newData.email && !(findUser.email === newData.email)){
                const findUserByEmail = await userModule.findOne({ "email": { $eq: newData.email } })
                if(findUserByEmail){
                    return res.status(400).send({
                        msg: "email alrady register",
                        success: false
                    })
                }
        }
        const updateData = await userModule.findOneAndUpdate({ _id: { $eq: id } }, newData, {new: true})
        return res.status(200).send({
            msg: "data updated",
            success: true,
            oldData: findUser,
            newData: updateData
        })
    }
    catch(err){
        console.log(`error in this req (\n${req}\n)\nerror is (\n${err}\n)`)
        return res.status(500).send({
            msg: "error in update Profile",
            success: false,
            error: err,
        })
    }
}



const sendEmail = async (userEmail, sub, msg) => {
    const transport = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        sender: true,
        auth: {
            user: process.env.EMAIL_FOR_NODEMAILER,
            pass: process.env.APP_PASS
        }
    })
    try {
        const info = await transport.sendMail({
            from: '"ViolentUjjwal"<2108ujjwal2108@gmail.com>',
            to: userEmail,
            subject: sub,
            text: msg
        })
        console.log("Msg send: ", info.messageId)
        return "mail_send"
    } catch (error) {
        console.log(error)
        return "not_send"
    }
}