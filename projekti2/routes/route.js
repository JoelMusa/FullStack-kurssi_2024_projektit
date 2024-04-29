const express = require('express');
const app = express.Router();
const fs = require("fs");
const itemController = require('../controllers/itemController');

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Route to get all items
app.get('/api/getall', async (req, res) => {
    try {
        const items = await itemController.getAllItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/:id', async (req, res) => {
    try {
        //id reads the replaced :id 
        const id = req.params.id;
        //calling the function to do the database operation in the itemController file
        const item = await itemController.getItemById(id);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { updatedName, updatedQuantity, updatedPrice } = req.body
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

app.post('/api/add', async (req, res) => {

    const { name, quantity, price } = req.body;

    try {
        const product = await itemController.addItem(req.body);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = app;