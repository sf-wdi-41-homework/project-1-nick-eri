var express = require('express');
var router = express.Router();
var controllers = require('../controllers');


router.route('/')
  	.get(controllers.statics.home);

router.route('/users')
	.get(controllers.users.show);

router.route('/users/:username')
	.get(controllers.users.index);

router.route('/users/:username/edit')
	.get(controllers.users.edit)
	.post(controllers.users.update);

router.route('/workspaceItems/:id')
	.delete(controllers.workspaceItems.destroy);

module.exports = router;
