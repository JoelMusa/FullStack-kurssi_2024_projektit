const express = require('express');
const app = express.Router();
const itemController = require('../controllers/itemController');

app.post('/api/add', async (req, res) => {
    try {
        const product = await itemController.addItem(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = app;