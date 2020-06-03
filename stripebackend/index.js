const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
// TODO: Add a Stripe key.
// const stripe = require("stripe")("")

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
app.listen(8282, () => {
    console.log("Listening on port: 8282")
})