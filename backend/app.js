const express = require("express");
const { google } = require("googleapis");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
//o-auth google
const OAUTH2 = google.auth.OAuth2;
app.use(express.json());
app.use(cookieParser());
//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

//middleware for error
app.use(errorMiddleware);
module.exports = app;
