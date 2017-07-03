var keystone = require('keystone');
var Patient = keystone.list('Patient');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'HealthForm';


	view.query('Patient',
		Patient.model.findOne()
		.where('email', req.user.email)
		);


	view.on('post', { action: 'profile.Health1' }, function(next) {

		Patient.model.findOne({'email': req.user.email}).exec(function(err,doc){
			
			doc.surgery = req.body.surgery;
			doc.condition = req.body.condition;
			doc.status = req.body.status;
			doc.duration = req.body.duration;
			doc.notes = req.body.notes;


			doc.getUpdateHandler(req).process(req.body,{
				fields: 'surgery,condition,status,duration,notes',
				flashErrors: true
			}, function(err) {

		if (err) {
			return next();
		}
		return next();
			});
		});

	});


	view.on('post', { action: 'profile.HealthS' }, function(next) {

		Patient.model.findOne({email: req.user.email}).exec(function(err,doc){
			
			doc.alcohol = req.body.alcohol;
			doc.diet = req.body.diet;
			doc.tobacco = req.body.tobacco;
			doc.exercise = req.body.exercise;
			doc.height = req.body.height;
			doc.weight = req.body.weight;


			doc.getUpdateHandler(req).process(req.body,{
				fields: 'alcohol,diet,tobacco,exercise,height,weight',
				flashErrors: true
			}, function(err) {

		if (err) {
			return next();
		}
		return next();
			});
		});

	});


		view.on('post', { action: 'profile.Health3' }, function(next) {

		Patient.model.findOne({email: req.user.email}).exec(function(err,doc){
			
			doc.famhis = req.body.famhis;
			doc.fcondition = req.body.fcondition;



			doc.getUpdateHandler(req).process(req.body,{
				fields: 'famhis,fcondition',
				flashErrors: true
			}, function(err) {

		if (err) {
			return next();
		}
		return next();
			});
		});

	});



	// Render the view
	view.render('healthform');
};
