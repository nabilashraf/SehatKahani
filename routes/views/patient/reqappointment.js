var keystone = require('keystone');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'Patient - Request Appointment';

	view.query('doctors', keystone.list('Doctor').model.find().sort('sortOrder'));
//	view.query('doctors',
//	Doctors.model.find()
//	.populate('name'));

	// Render the view
	view.render('patient/reqappointment');
};
