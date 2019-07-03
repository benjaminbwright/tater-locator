const apiRoutes = require('express').Router();
const axios = require('axios');

// Get tots from yelp
apiRoutes.get('/v1/tots/:lat/:lng', (req, res) => {

    // configurations for axios request
    var url = 'https://api.yelp.com/v3/businesses/search?term=tater+tots&latitude=' + req.params.lat + '&longitude=' + req.params.lng;
    var config = {
        headers: {
            'Authorization': 'Bearer RU48vaocL9hVtr0Y-NuP78wm6YCrvf5xmenzdXguLC1KGU2tXUvfa7jyx4_kBQoLFI4uTdsNES9fdx7m_5797qvbW3dLgmSAdxoIaltoS5CgFXxjgcLESn5oS2UaXXYx'
        }
    }

    // Get tot json from yelp
    axios.get(url, config).then((response) => {
        // Return json code
        res.send(response.data);
    });
});

module.exports = apiRoutes;