const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(
  cors({
    origin: "*", // Allow requests only from this origin
    methods: "GET,POST", // Allow only specified HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow only specified headers
    optionsSuccessStatus: 204,
    credentials: true, // Respond with 204 No Content for preflight requests
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const auctionRoutes = require("./routes/auctionRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", auctionRoutes);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
