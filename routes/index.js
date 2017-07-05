/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var passport = require('passport');



keystone.pre('routes', passport.initialize());
keystone.pre('routes', passport.session());
// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.get('/profile', routes.views.profile);
	// Sessions

	app.all('/join', routes.views.sessions.join);
	app.all('/joinDoc', routes.views.sessions.joinDoc);
	app.all('/signin', routes.views.sessions.signin);
	app.get('/signout', routes.views.sessions.signout);

	// Doctors
	app.get('/doctors', routes.views.doctors);
	app.get('/doctors/dashboard', routes.views.doctor.dashboard);
	app.get('/doctors/appointment', routes.views.doctor.appointment);
	// Patients
	app.get('/patients', routes.views.patients);
	app.get('/patients/dashboard', routes.views.patient.dashboard);
	app.all('/patients/healthForm', routes.views.patient.healthform);
	app.get('/patients/appointment', routes.views.patient.appointment);
	app.get('/patients/reqappointment', routes.views.patient.reqappointment);

	//Auth

	app.get('/auth/facebook', passport.authenticate('facebook', {scope : ['email']}));

	app.get('/auth/facebook/callback',
  		passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/signin' }));


	app.get('/auth/google', passport.authenticate('google', {scope : ['profile','email']}));

	app.get('/auth/google/callback',
  		passport.authenticate('google', { successRedirect: '/profile',
                                      failureRedirect: '/signin' }));


	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);



};
