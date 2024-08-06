const express = require("express");
const { getProfile, updateProfile} = require("../controller/userController");

const userrouter = express.Router()
const checktoken = require("../middleware/checkToken")


userrouter.use(checktoken)

// forgetPassword - forget {POST}


// Create User - signup {POST}
userrouter.get("/profile", getProfile);
userrouter.put("/update", updateProfile)



module.exports = userrouter