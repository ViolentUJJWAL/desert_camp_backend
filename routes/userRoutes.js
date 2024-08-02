const express = require("express");
const { SignupUser, loginUser} = require("../controller/userController");

const authrouter = express.Router()


// forgetPassword - forget {POST}


// Create User - signup {POST}
authrouter.post("/signup", SignupUser);

// Login User - login {POST}
authrouter.post("/login", loginUser);


module.exports = authrouter