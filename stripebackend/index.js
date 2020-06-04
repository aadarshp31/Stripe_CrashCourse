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

app.post("/payment", (req, res) => {
    const { product, token } = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);
    //This key will be used to track a unique order
    idempotencyKey = uuid();

    //Stripe Create Customer
    stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer => {
        stripe.charges.create({
            //Compulsory
            customer: customer.id,
            amount: product.price * 100,
            currency: "usd",
            //Optional
            recipient_email: customer.email,
            description: `Purchase of product: ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    city: token.card.address_city,
                    country: token.card.address_country
                }
            }
        }, {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))

})

//listen
const port = process.env.PORT
app.listen(port, () => {
    console.log("Listening on port: ", port)
})