var express = require('express');
var router = express.Router();
var staticsController = require('../controllers/staticsController');
var usersController = require('../controllers/usersController');
var softwaresController = require('../controllers/softwaresController');
var workspaceItemsController = require('../controllers/workspaceItemsController');


router.route('/')
  	.get(staticsController.home);

router.route('/users')
	.get(usersController.users);

router.route('/users/:id')
	.get(usersController.index);

module.exports = router;
