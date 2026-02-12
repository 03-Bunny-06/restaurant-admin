const env = require("dotenv");
env.config({path: "./.env"});

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const YAML = require("yamljs");
const app = express();
const bodyParser = require("body-parser");
const menuRouter = require("./routes/menuRoutes.js");
const orderRouter = require("./routes/orderRoutes");

const connectDb = require("./config/db.js");
connectDb();

const swaggerDocument = YAML.load(path.join(__dirname, "openapi.yaml"))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use('/menu', menuRouter);
app.use('/orders', orderRouter);

app.use(async(req, res) => {
    res.status(404).json({
        msg: "Bad route (or) No route found"
    })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("Port started at: " + PORT);
})