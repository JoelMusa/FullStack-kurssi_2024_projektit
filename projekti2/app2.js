require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const readAllRoute = require('./routes/readAllRoute');
const readByIdItemRoute = require('./routes/readByIdItemRoute');
const addItemRoute = require('./routes/createItemRoute');
const updateItemRoute = require('./routes/updateItemRoute');
const deleteItemRoute = require('./routes/deleteItemRoute');
const homeRoute = require('./routes/homeRoute')

const app = express();
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

// Mount routes
app.use(homeRoute);
app.use(readAllRoute);
app.use(readByIdItemRoute);
//app.use(addItemRoute);
//app.use(updateItemRoute);
//app.use(deleteItemRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));