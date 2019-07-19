// Require express.js
require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();

const apiRoutes = require('./apiRoutes')

const PORT = process.env.PORT || 5000;

// Make compiled react app public
app.use(express.static(path.join(__dirname, 'client/build')));

// API Routes ==================================== //

// v1 routes
app.use('/api/v1', apiRoutes);

// Start the server listening for requests.
app.listen(PORT, () => {
    console.log(`Your server is running on http://localhost:${PORT}`);
});