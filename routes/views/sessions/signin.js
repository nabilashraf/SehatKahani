var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
exports = module.exports = function(req, res) {
	
/*	if (req.user) {
		return res.redirect(req.cookies.target || '/');
	}
*/	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'session';
	locals.form = req.body;
	
	view.on('post', { action: 'signin' }, function(next) {
		
		if (!req.body.email || !req.body.password) {
			req.flash('error', 'Please enter your username and password.');
			return next();
		}
		
		var onSuccess = function() {
			if (req.body.target && !/join|signin/.test(req.body.target)) {
				console.log('[signin] - Set target as [' + req.body.target + '].');
					res.redirect('/welcome/');
				}
			 else {
				res.redirect('/');
			}
		}
		
		var onFail = function() {
			req.flash('error', 'Your username or password were incorrect, please try again.');
			return next();
		}
		
		keystone.session.signin({ email: req.body.email, password: req.body.password }, req, res, onSuccess, onFail);
		
	});
	
	var FACEBOOK_APP_ID = "603687426645893";
	var FACEBOOK_CLIENT_SECRET = "e9bc2830e1471e69b62a7dbc7b5cec77";
	var FACEBOOKcallback = "http://localhost:3000/auth/facebook/callback";



	passport.use(new FacebookStrategy({
	    clientID: FACEBOOK_APP_ID,
	    clientSecret: FACEBOOK_CLIENT_SECRET,
	    callbackURL: FACEBOOKcallback,
	    profileFields: ['emails','name']
	  },
	  function(accessToken, refreshToken, profile, done) {
	    process.nextTick(function(){
	    	User.model.findOne({'facebook.fid': profile.id}, function(err,user){
	    		if(err)
	    			return done(err);
	    		if(user)
	    			return done(null, user);
	    		else {
	    			var newUser= new User.model();
	    			newUser.facebook.fid = profile.id;
	    			newUser.facebook.token = accessToken;
	    			newUser.name.first = profile.name.givenName;
	    			newUser.name.last = profile.name.familyName;
	    			newUser.email = profile.emails[0].value;
	    			console.log(newUser)
	    			newUser.save(function(err){
	    				if(err)
	    					throw err;
	    				return done(null,newUser);
	    			})
	    		}
	    	})
	    })
	  }
	));


	var GOOGLE_APP_ID = "970539159370-r27676du3tc9k1hq26qa9lv9gc1uov18.apps.googleusercontent.com";
	var GOOGLE_CLIENT_SECRET = "7rqoF1LqaSsMgQyhxgg5tFQV";
	var GOOGLEcallback = "http://localhost:3000/auth/google/callback";


	passport.use(new GoogleStrategy({
	    clientID: GOOGLE_APP_ID,
	    clientSecret: GOOGLE_CLIENT_SECRET,
	    callbackURL: GOOGLEcallback
	  },
	  function(accessToken, refreshToken, profile, done) {
	    process.nextTick(function(){
	    	User.model.findOne({'google.fid': profile.id}, function(err,user){
	    		if(err)
	    			return done(err);
	    		if(user)
	    			return done(null, user);
	    		else {
				
/*
				var data = {
						google: {
	    					fid : profile.id,
		    				token : accessToken,
		    				name : profile.displayName,
	    					email : profile.emails[0].value
	    					}
				};
*/
//				console.log(data.google.name);
	    			var newUser = new User.model();
	    			newUser.google.fid = profile.id;
	    			newUser.google.token = accessToken;
	    			newUser.name.first = profile.displayName;
	    			newUser.email = profile.emails[0].value;

	    			newUser.save(function(err){
	    				if(err)
	    					throw err;
	    				return done(null,newUser);
	    			})
	    		}
	    	})
	    })
	  }
	));


	view.render('sessions/signin');
	
}
