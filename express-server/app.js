require("dotenv").config();
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var authRouter = require("./routes/auth.js");
var todoRouter = require("./routes/todo.js");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

require("./setupMongo.js")();

app.use("/auth", authRouter);
app.use("/todos", todoRouter);

module.exports = app;
