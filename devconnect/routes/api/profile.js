const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load profile model
const Profile = require('../../models/Profile');
// Load user model
const User = require('../../models/User');

// don't need api/profile because we already did it over in server.js
// automatically serve a 200 status
// @route GET api/profile/test
// @description Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({
    msg: 'Profile Works'
}));

// @route GET api/profile
// @description Get current users profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({
        user: req.user.id
    })
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/test
// @description Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({
    msg: 'Profile Works'
}));

// @route POST api/profile
// @description Create user profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = valid

    // Get fields
    const profileFields = {};
    // avatar name and email
    profileFields.user = req.user.id;

    //checking to see if this was sent in the request
    if(req.body.handle){
        profileFields.handle = req.body.handle;
    }

    if(req.body.company){
        profileFields.company = req.body.company;
    }

    if(req.body.website){
        profileFields.website = req.body.website;
    }

    if(req.body.location){
        profileFields.location = req.body.location;
    }

    if(req.body.bio){
        profileFields.bio = req.body.bio;
    }

    if(req.body.status){
        profileFields.status = req.body.status;
    }

    if(req.body.githubusername){
        profileFields.githubusername = req.body.githubusername;
    }

    // skills - split into an array. The split gives us an array instead of a list
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};

    if(req.body.youtube){
        profileFields.social.youtube = req.body.youtube;
    }
    if(req.body.twitter){
        profileFields.social.twitter = req.body.twitter;
    }
    if(req.body.facebook){
        profileFields.social.facebook = req.body.facebook;
    }
    if(req.body.linkedin){
        profileFields.social.linkedin = req.body.linkedin;
    }
    if(req.body.instagram){
        profileFields.social.instagram = req.body.instagram;
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(profile) {
                //update the profile
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                .then(profile => res.json(profile));
            } else {
                //create a profile

                // Check to see if the handle exists
                profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if(profile) {
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }

                        // If there isnt a profile with the handle then save profile
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    })
            }
        })
});

module.exports = router;