const express = require('express');
const app = express.Router();
const fs = require("fs");
const itemController = require('../controllers/itemController');

app.use(express.static("public"));

// Route to serve the index.html file when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Route to get all items from the database
app.get('/api/getall', async (req, res) => {
    try {
        // Retrieve all items from the database using itemController
        const items = await itemController.getAllItems();
        // Send a JSON response with the retrieved items
        res.status(200).json(items);
    } catch (error) {
        // Send a 500 error response if an error occurs
        res.status(500).json({ message: error.message });
    }
});

// Route to get a single item by ID from the database
app.get('/api/:id', async (req, res) => {
    try {
        // Extract the ID from the request parameters
        const id = req.params.id;
        // Retrieve the item from the database using itemController
        const item = await itemController.getItemById(id);

        if (!item) {
            // Send a 404 error response if the item is not found
            return res.status(404).json({ error: 'Item not found' });
        }

        // Send a JSON response with the retrieved item
        res.status(200).json(item);
    } catch (error) {
        // Send a 500 error response if an error occurs
        res.status(500).json({ message: error.message });
    }
});

// Route to update a single item in the database
app.put('/api/update/:id', async (req, res) => {
    try {
        // Extract the ID and updated fields from the request parameters and body
        const id = req.params;

        // Update the item in the database using itemController
        const item = await itemController.updateItemById(id, req.body);

        if (!item) {
            // Send a 404 error response if the item is not found
            return res.status(404).json({ message: "Product not found" });
        }

        // Retrieve the updated item from the database
        const updatedItem = await itemController.getItemById(id);
        // Send a JSON response with the updated item
        res.status(200).json(updatedItem);
    } catch (error) {
        // Send a 500 error response if an error occurs
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a single item from the database
app.delete('/api/delete/:id', async (req, res) => {
    try {
        // Extract the ID from the request parameters
        const { id } = req.params;
        // Delete the item from the database using itemController
        const item = await itemController.deleteItemById(id);

        if (!item) {
            // Send a 404 error response if the item is not found
            return res.status(404).json({ message: "Product not found" });
        }

        // Send a success message in the JSON response
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        // Send a 500 error response if an error occurs
        res.status(500).json({ message: error.message });
    }
});

// Route to add a new item to the database
app.post('/api/add', async (req, res) => {
    // Extract name, quantity, and price from the request body
    const { name, quantity, price } = req.body;

    try {
        // Add the new item to the database using itemController
        const product = await itemController.addItem(req.body);
        // Send a JSON response with the added product
        res.status(200).json(product);
    } catch (error) {
        // Send a 500 error response if an error occurs
        res.status(500).json({ message: error.message });
    }
});

module.exports = app;