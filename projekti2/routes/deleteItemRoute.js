const express = require('express');
const app = express.Router();
const itemController = require('../controllers/itemController');

app.delete('/api/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const item = await itemController.deleteItemById(id);

        if (!item) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = app;