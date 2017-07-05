var keystone = require('keystone'),
    async = require('async'),
    crypto = require('crypto'),
    Types = keystone.Field.Types;

/**
 * Doctor Model
 * ===========
 */

var Doctor = new keystone.List('Doctor', {
    autokey: { path: 'slug', from: 'name', unique: true },
    track: true
});


Doctor.add({

        name: { type: Types.Name, required: true, index: true },
        UserId: { type: Types.Relationship, ref: 'User', index: true, filters: { isDoctor: true }},
        name: { type: Types.Name},
        UserId: { type: String},
        email: { type: Types.Email},
    }, 'Profile', {
        isPublic: { type: Boolean, default: true },
        photo: { type: Types.CloudinaryImage },
        twitter: { type: String, width: 'short' },
        school: { type: String, width: 'short' },
        website: { type: Types.Url },
        bio: { type: Types.Textarea },
        awards: { type: Types.Textarea},
        speciality: { type: Types.Select, options: 'Cardiology, Pathology, Neurology'},
        medno: { type: Types.Number, format: '00', noedit: true},
        degree: {type: Types.Select, options: 'Bachelors, Masters, PhD'}

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

/**
 * Registration
 * ============
 */

//Doctor.addPattern('track');
Doctor.defaultColumns = 'name, UserId, email, medno, speciality, isDoctor, _id';
Doctor.register();
