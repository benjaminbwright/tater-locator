// Router instance
const apiRoutes = require('express').Router();

// Controllers
const TotsController = require('../controllers/totsController');

// Get tots from yelp
apiRoutes.get('/tots/:lat/:lng', TotsController.getTots );

module.exports = apiRoutes;