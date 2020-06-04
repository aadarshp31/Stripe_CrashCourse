const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const stripe = require("stripe")(process.env.SECRET_KEY)
require('dotenv').config()

//creating an instance of express
const app = express();

//middlewares
app.use(express.json())
app.use(cors())

//routes
app.get("/", (req, res) => {
    res.send("Express Server is running...")
})

//listen
const port = process.env.PORT
app.listen(port, () => {
    console.log("Listening on port: ", port)
})