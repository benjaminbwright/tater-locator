// Require express.js
const express = require('express');
const app = express();

var PORT = 8080;

// Make the public folder available to serve image assets
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Your server is running on http://localhost:${PORT}`);
});