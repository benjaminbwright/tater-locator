const yelpService = require('../services/yelpService');

exports.getTots = async function(req, res, next) {
    
    // Get location from parameters
    const location = {lat: req.params.lat, lng: req.params.lng}

    // Use yelp service to get tot locations
    yelpService.totLocations(location).then((response) => {
        // Return json code
        res.send(response.data);
    });

}