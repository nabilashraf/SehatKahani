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
        email: { type: Types.Email, initial: true, index: true, displayGravatar: true , unique: true},
    }, 'Profile', {
        isPublic: { type: Boolean, default: true },
        photo: { type: Types.CloudinaryImage },
        twitter: { type: String, width: 'short' },
        school: { type: String, width: 'short' },
        website: { type: Types.Url },
        bio: { type: Types.Textarea },
        awards: { type: Types.Textarea},
        speciality: { type: Types.Select, options: 'Cardiology, Pathology, Neurology', index: true},
        medno: { type: Types.Number, format: '00', noedit: true},
        degree: {type: Types.Select, options: 'Bachelors, Masters, PhD', index: true},
        gravatar: { type: String, noedit: true }
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

Doctor.relationship({ ref: 'Post', refPath: 'author', path: 'posts' });
Doctor.relationship({ref: 'User', refPath: 'doctor', path: 'users'});

/**
 * Registration
 * ============
 */

//Doctor.addPattern('track');
Doctor.defaultColumns = 'name, nameuser, email, medno, speciality, isDoctor';
Doctor.register();
