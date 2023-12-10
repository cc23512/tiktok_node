const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(
  session({
    secret: "BD23512",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));
app.use(express.static("views"));
app.use("/videos", express.static(path.join(__dirname, "views/videos")));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const rotas = require("../app/routes/rotas");
rotas(app);

module.exports = app;
