var keystone = require('keystone');
var Types = keystone.Field.Types;
var mongoose = require('mongoose');

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User',{
	autokey: { path: 'key', from: 'name', unique: true },
	track: true
});

User.add({
	salutation: { type: Types.Select, options: 'Mr., Mrs., Ms., Dr.', index: true},
	name: { type: Types.Name, required: true, index: true },
	gender: { type: Types.Select, options: 'Male, Female', deafult: '', index: true},
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true },
	photo: { type: Types.CloudinaryImage },
	patient:  { type: Types.Relationship, ref: 'Patient'},
	doctor: { type: Types.Relationship, ref: 'Doctor'}
	
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	isDoctor: { type: Boolean, label: 'Mashwara Expert', initial: true},
	isPatient: { type: Boolean, label: 'Mashwara Patient', initial: true}
}, 'Services',{
		facebook: {
		fid: {type: String},
		token: {type: String}
	}, google: {
		fid: {type: String},
		token: {type: String}	}
}

);


// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Doctor', refPath: 'UserId', path: 'doctors'});
User.relationship({ ref: 'Patient', refPath: 'UserId', path: 'patients'});

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
