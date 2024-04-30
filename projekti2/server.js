require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/route')
const bodyParser = require("body-parser");
const app = express();
const uri = process.env.MONGODB_URI;


// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB')) // Log success message if connection is successful
    .catch(err => console.error('Error connecting to MongoDB:', err)); // Log error if connection fails

// Middleware
// Parse incoming request bodies as JSON
app.use(express.json());
// Parse incoming request bodies as URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Mount routes
// Use routes defined in the 'routes' module
app.use(routes);


// Middleware to handle errors
app.use((err, req, res, next) => {
    // Log the error stack trace
    console.error(err.stack);
    // Send a 500 response with an error message
    res.status(500).send('Something went wrong!');
});


// Define the port on which the server will listen
const PORT = process.env.PORT || 3000;
// Start the server 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));