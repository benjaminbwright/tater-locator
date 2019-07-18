const axios = require('axios');

const yelpService = {
    // method that gets all the "tater tots" location
    // takes a loctation object as a parameter
    totLocations: function(location) {
        // configurations for axios request
        var url = 'https://api.yelp.com/v3/businesses/search?term=tater+tots&latitude=' + location.lat + '&longitude=' + location.lng;
        var config = {
            headers: {
                'Authorization': 'Bearer ' + process.env.YELP_API_TOKEN
            }
        }

        // Get tot json from yelp
        return axios.get(url, config)
            .then((data) => {
                console.log(data);
                return data;
            });
    }
}



module.exports = yelpService;