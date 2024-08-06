const jwt = require("jsonwebtoken")
require("dotenv").config()

function checktoken(req, res, next){
    try {
        secretKey = process.env.SK_KEY
        const token = req.cookies.token
        console.log("token", token)
        let verifyToken = jwt.verify(token, secretKey)
        req.user = verifyToken.id
        next()
    } catch (error) {
        return res.status(401).send({
            msg: "please log in first",
            success: false
        })
    }
}

module.exports = checktoken
