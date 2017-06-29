var keystone = require('keystone');
var User = keystone.list('User');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
		locals.data = {
			profile: []
		};

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'profile';
	view.query('User',
		User.model.findOne()
		.where('email', req.user.email)
		);


	// Render the view
	view.render('profile');
};
