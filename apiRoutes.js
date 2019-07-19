// Requires
const apiRoutes = require('express').Router();
const TotsController = require('./controllers/totsController');

// Get tots from yelp
apiRoutes.get('/tots/:lat/:lng', TotsController.getTots );

module.exports = apiRoutes;