var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');
	
exports = module.exports = function(req, res) {
	
/*	if (req.user) {
		return res.redirect(req.cookies.target || '/');
	}
*/	
	var view = new keystone.View(req, res),
		locals = res.locals;
	locals.section = 'session';
	locals.form = req.body;
	view.on('post', { action: 'join' }, function(next) {
		
		async.series([
			
			function(cb) {
				
				if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
					req.flash('error', 'Please enter a name, email and password.');
					return cb(true);
				}
				
				return cb();
				
			},
			
			function(cb) {
				
				keystone.list('User').model.findOne({ email: req.body.email }, function(err, user) {
					
					if (err || user) {
						req.flash('error', 'User already exists with that email address.');
						return cb(true);
					}
					
					return cb();
					
				});
				
			},
			
			function(cb) {
			
				var userData = {
					name: {
						first: req.body.firstname,
						last: req.body.lastname,
					},
					isPatient: true,
					email: req.body.email,
					password: req.body.password
				};
				


				var pData = {
					name: {
						first: req.body.firstname,
						last: req.body.lastname,
					},
					email: req.body.email,
				};
					
				var User = keystone.list('User').model,
					Patient = keystone.list('Patient').model,
					newUser = new User(userData),
					newP = new Patient(pData);

				newP.save();

				newUser.save(function(err) {
					return cb(err);
				});
			
			}
			
		], function(err){
			
			if (err) return next();
			
			var onSuccess = function() {
				if (req.body.target && !/join|signin/.test(req.body.target)) {
					console.log('[join] - Set target as [' + req.body.target + '].');
					res.redirect(req.body.target);
				} else {
					res.redirect('/patients/dashboard');
				}
			}
			
			var onFail = function(e) {
				req.flash('error', 'There was a problem signing you in, please try again.');
				return next();
			}
			
			keystone.session.signin({ email: req.body.email, password: req.body.password }, req, res, onSuccess, onFail);
			
		});
		
	});
	
	view.render('sessions/join');
	
}
