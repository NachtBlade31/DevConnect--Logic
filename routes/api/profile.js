const express = require('express');
const router = express.Router();
const request = require('request')
const config = require('config')
const auth = require('../../middleWare/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post')
const { check, validationResult } = require('express-validator');

//@route  GET api/profile/me
//@desc   Get current user's profile
//@access private
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route  POST api/profile/me
//@desc   POST  create/update user's profile
//@access private
router.post("/", [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    //Build Profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) {
        if (website.includes('http://') || website.includes('https://'))
            profileFields.website = website;

        else
            profileFields.website = `http://${website}`;
    }
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    //Build social object
    profileFields.social = {}
    if (youtube) {
        if (youtube.includes('http://') || youtube.includes('https://'))
            profileFields.social.youtube = youtube;

        else
            profileFields.social.youtube = `http://${youtube}`;
    }
    if (twitter) {
        if (twitter.includes('http://') || twitter.includes('https://'))
            profileFields.social.twitter = twitter;

        else
            profileFields.social.twitter = `http://${twitter}`;
    }
    if (facebook) {
        if (facebook.includes('http://') || facebook.includes('https://'))
            profileFields.social.facebook = facebook;

        else
            profileFields.social.facebook = `http://${facebook}`;
    }
    if (linkedin) {
        if (linkedin.includes('http://') || linkedin.includes('https://'))
            profileFields.social.linkedin = linkedin;

        else
            profileFields.social.linkedin = `http://${linkedin}`;
    }
    if (instagram) {
        if (instagram.includes('http://') || instagram.includes('https://'))
            profileFields.social.instagram = instagram;

        else
            profileFields.social.instagram = `http://${instagram}`;
    }

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            if (youtube) profileFields.social.youtube = youtube;
            if (youtube) profileFields.social.youtube = youtube;
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }

        //Create new profile if not found
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

//@route  GET api/profile
//@desc   Get all profile
//@access public
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

})

//@route  GET api/profile/user/:user_id
//@desc   Get  profile by userid
//@access public
router.get("/user/:user_id", async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }

})

//@route  Delete api/profile
//@desc   Delete profile,user,post
//@access Private
router.delete("/", auth, async (req, res) => {
    try {
        // Remove users posts
        await Post.deleteMany({ user: req.user.id });

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove User
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: "User removed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

})

//@route  PUT api/profile/expereince
//@desc   Add profile experience
//@access Private
router.put("/experience", [auth,
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description } = req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try {
        let profile = await Profile.findOne({ user: req.user.id })
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}
);

//@route  DELETE api/profile/expereince/:exp_id
//@desc   DELETE profile experience
//@access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


//@route  PUT api/profile/education
//@desc   Add profile education
//@access Private
router.put("/education", [auth,
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of  Study  is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description } = req.body;
    const newEd = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    try {
        let profile = await Profile.findOne({ user: req.user.id })
        profile.education.unshift(newEd);
        await profile.save();
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}
);

//@route  DELETE api/profile/education/:ed_id
//@desc   DELETE profile education
//@access Private
router.delete("/education/:exp_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.ed_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

//@route  GET api/profile/github/:username
//@desc   GET user Repos from Github
//@access public
router.get("/github/:username", (req, res) => {
    try {
        const options = {
            uri: encodeURI(
                `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
            ),
            method: 'GET',
            headers: {
                'user-agent': 'node.js',
                Authorization: `token ${config.get('githubToken')}`
            }
        };
        request(options, (error, response, body) => {
            if (error) console.error(error);
            if (response.statusCode !== 200) {
                return res.status(400).json({ msg: "No github profile found" })
            }
            res.json(JSON.parse(body));
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;