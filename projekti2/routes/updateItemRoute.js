const express = require('express');
const app = express.Router();
const itemController = require('../controllers/itemController');

app.put('/api/update/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const item = await itemController.updateItemById(id, req.body);

        if (!item) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedItem = await itemController.getItemById(id);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = app;