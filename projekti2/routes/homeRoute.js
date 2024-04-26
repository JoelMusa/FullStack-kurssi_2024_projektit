const express = require('express');
const app = express.Router();
const fs = require("fs");
const path = require("path");

app.use("FullStack-kurssi_2024_projektit/projekti2", express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

module.exports = app;