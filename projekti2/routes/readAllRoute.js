const express = require('express');
const app = express.Router();
const itemController = require('../controllers/itemController');


// Route to get all items
app.get('/api/getall', async (req, res) => {
    try {
        const items = await itemController.getAllItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = app;
