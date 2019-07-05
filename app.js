// Require express.js
const express = require('express');
const app = express();

const apiRoutes = require('./apiRoutes')

const PORT = process.env.PORT || 5000;

// Make the public folder available to serve image assets
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// API Routes ==================================== //

app.use('/api', apiRoutes);

// Start the server listening for requests.
app.listen(PORT, () => {
    console.log(`Your server is running on http://localhost:${PORT}`);
});