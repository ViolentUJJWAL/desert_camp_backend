const colors = require('colors')
const express = require("express")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")


const appServer = async () => {
    try {

        const PORT = process.env.PORT || 8000

        // rest object
        const app = express()

        // middelware
        // app.use(cors())
        app.use(express.json())
        app.use(cookieParser())
        // app.use(morgan("dev"))

        // routes
        app.use("/api/v1/auth", authRoutes)
        app.use("/api/v1/user", userRoutes)

        // server listen
        app.listen(PORT, () => {
            console.log(`Server running on Post- ${PORT}`.bgBlue.black)
        })

    }
    catch (err) {
        console.log(`app occur error {\n${err}\n}`.bgRed.black)
    }
}

module.exports = appServer


