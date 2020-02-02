// Import packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Import routes
const auth = require("./routes/auth");
const routes = require("./routes/routes");

// Initiate app
const app = express();

// Import environment config variables
dotenv.config();

// Middlewares
app.use(express.json());     // Parses request body to json

// Route middlewares
app.use("/user", auth);
app.use("/", routes);

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => { console.log("connected to db!"); });

app.listen(3000, () => { console.log("server is running.") });