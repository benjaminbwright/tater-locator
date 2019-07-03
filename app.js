// Require express.js
const express = require('express');
const app = express();
const axios = require('axios');

var PORT = 8080;

// Make the public folder available to serve image assets
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// API Routes ==================================== //

// Get tots from yelp
app.get('/api/v1/tots/:lat/:lng', (req, res) => {

    var url = 'https://api.yelp.com/v3/businesses/search?term=tater+tots&latitude=' + req.params.lat + '&longitude=' + req.params.lng;
    var config = {
        headers: {
            'Authorization': 'Bearer RU48vaocL9hVtr0Y-NuP78wm6YCrvf5xmenzdXguLC1KGU2tXUvfa7jyx4_kBQoLFI4uTdsNES9fdx7m_5797qvbW3dLgmSAdxoIaltoS5CgFXxjgcLESn5oS2UaXXYx'
        }
    }

    axios.get(url, config).then((response) => {
        res.send(response.data);
    });

})

app.listen(PORT, () => {
    console.log(`Your server is running on http://localhost:${PORT}`);
});