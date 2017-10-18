var express = require('express');
var router = express.Router();
var controllers = require('../controllers');


router.route('/')
  	.get(controllers.statics.home);

router.route('/users')
	.get(controllers.users.show);

router.route('/users/:id')
	.get(controllers.users.index);

module.exports = router;
