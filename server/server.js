const env = require("dotenv");
env.config({path: "./.env"});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const menuRouter = require("./routes/menuRoutes.js");
const orderRouter = require("./routes/orderRoutes");

const connectDb = require("./config/db.js");
connectDb();

app.use(bodyParser.json());
app.use('/menu', menuRouter);
//app.use('/order', orderRouter);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("Port started at: " + PORT);
})