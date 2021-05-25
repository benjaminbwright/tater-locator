const apiRoutes = require("express").Router();
const yelpService = require("./services/yelpService");

// Get tots from yelp
apiRoutes.get("/v1/tots/:lat/:lng", (req, res) => {
  const location = { lat: req.params.lat, lng: req.params.lng };

  yelpService.totLocations(location).then((response) => {
    // Return json code
    res.send(response.data);
  });
});

// login and signup routes

module.exports = apiRoutes;
