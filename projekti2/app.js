const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const read = require("projekti2/readMongoDB.js")


const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/getall", function (req, res) { })

app.get("/api/:id", function (req, res) { })

app.post("/api/add", function (req, res) { })

app.put("/api/update/:id", function (req, res) { })

app.delete("/api/delete/:id", function (req, res) { })

app.listen(port, function () {
    console.log("Kuunnellaan porttia" + port + "!");
});