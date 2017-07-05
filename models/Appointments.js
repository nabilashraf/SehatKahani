var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Appointments = new keystone.List('Appointments', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Appointments.add({
	DoctorId: { type: String},
	RequestTime: { type: Date, default: Date.now },
	PatientId: { type: String},
	Description : { type: String},
	Status : { type: Types.Select, options: 'Requested, Confirmed, Rejected'},
	AppointmentTime : {type: Date}
});

Appointments.register();
