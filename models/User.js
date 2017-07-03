var keystone = require('keystone');
var Types = keystone.Field.Types;
var mongoose = require('mongoose');

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
}, 'Services',{
		facebook: {
		fid: {type: String},
		token: {type: String}
	}, google: {
		fid: {type: String},
		token: {type: String}
	}
}, 'SocialHistory', {
  alcohol: { type: Types.Select, options: 'no, yes, yes (1-4 drinks a week), yes (5-8 drinks a week), yes (More than 8 drinks a week)',index: true },
  diet: { type: Types.Select, options: 'no restrictions, no red meat, no meat other than fish, vegeterian',index: true },
  tobacco: { type: Types.Select, options: 'no, yes daily, yes occasionaly', index: true },
  exercise: { type: Types.Select, options: 'light, moderate, heavy', index: true },
  height: Number,
  weight: Number,
},
'FamHistory',{
	famhis: { type: Types.Select, options: 'father, mother, son, daughter, brother, sister , grandfather, grandmother , uncle, aunt, surrogate',index: true },
	fcondition: { type: Types.Textarea },
},
'MedSummary',{
	surgery: { type: Types.Textarea },
  	condition: { type: Types.Textarea },
  	status: { type: Types.Select, options: 'Active , Inactive , In Process , Resolved/Cured'},
  	duration: { type: Types.Select, options: '1-3 weeks ago ,1-3 months ago,4-6 months ago,6-12 months ago,2-4 years ago,more than 4 years'},
  	notes: { type: Types.Textarea }

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


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
