var express           = require('express');
var router            = express.Router();
var staticsController = require('../controllers/staticsController');

router.route('/')
  	.get(staticsController.home);

router.route('/users')
	.get(staticsController.users);
  
module.exports = router;
