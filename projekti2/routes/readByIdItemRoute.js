const express = require('express');
const app = express.Router();
const itemController = require('../controllers/itemController');


app.get('/api/:id', async (req, res) => {
    try {
        //itemID reads the replaced :id 
        const itemId = req.params.id;
        //calling the function to do the database operation in the itemController file
        const item = await itemController.getItemById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = app;