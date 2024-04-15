const schema = require('../models/schema');

// Controller functions for CRUD operations on items

// Get all items
async function getAllItems() {
    return await schema.find();
}

// Get single item by ID
async function getItemById(id) {
    return await schema.findById(id);
}

// Add a new item
async function addItem(itemData) {
    const newItem = new schema(itemData);
    return await newItem.save();
}

// Update an item by ID
async function updateItemById(id, newData) {
    return await schema.findByIdAndUpdate(id, newData, { new: true });
}

// Delete an item by ID
async function deleteItemById(id) {
    return await schema.findByIdAndDelete(id);
}

module.exports = {
    getAllItems,
    getItemById,
    addItem,
    updateItemById,
    deleteItemById
};