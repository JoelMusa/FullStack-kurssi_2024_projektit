const express = require('express');
const app = express.Router();


app.get('/', (req, res) => {
    res.send("Welcome to the API!")
});

module.exports = app;