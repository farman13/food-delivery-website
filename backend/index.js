const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user")
const mongoDB = require('./db');
const cors = require('cors');
const { displayRouter } = require("./routes/displayData");
const { OrderRouter } = require("./routes/orderData");

// Use CORS middleware for proper configuration
app.use(cors({
    origin: "https://food-delivery-website-5fn5.vercel.app", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
}));

app.use(express.json());
app.use("/user", userRouter);
app.use("/data", displayRouter);
app.use("/order", OrderRouter);
app.get('/', function (req, res) {
    res.json({
        message: "hello "
    })
})

async function main() {
    await mongoose.connect("mongodb+srv://farman32740:f%40rman32740@cluster0.wvi5a.mongodb.net/foodDelivery-app");
    app.listen(5000);
    mongoDB();
    console.log("Listening to port 3000");
}

main();
