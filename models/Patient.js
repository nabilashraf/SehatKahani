var keystone = require('keystone'),
	async = require('async'),
	crypto = require('crypto'),
	Types = keystone.Field.Types;

/**
 * Patient Model
 * ===========
 */

var Patient = new keystone.List('Patient', {
	autokey: { path: 'slug', from: 'name', unique: true },
	track: true
});


Patient.add({

	name: {type: Types.Name},
	UserId: { type: Types.Relationship, ref:'User' , index: true, filters: { isPatient: true }},
	email: { type: Types.Email},
},
'SocialHistory', {
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


/** 
	Pre-save
	=============
*/



/** 
	Relationships
	=============
*/
Patient.relationship({ ref: 'User', refPath: 'patient', path: 'users' });


/**
 * Registration
 * ============
*/

Patient.defaultColumns = 'name, email, UserId';
Patient.register();