const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/Auth');
const Profile = require('../../models/Profiles');
const User = require('../../models/User');
const Post = require('../../models/Posts');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const config = require('config');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if (!profile) return res.status(404).json({ msg: 'There is no profile for this user' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Create or update user's profile
// @access  Private
router.post(
  '/',
  [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty()
  ]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {
      company, website, location, status, skills,
      bio, githubusername, experience, education,
      youtube, twitter, facebook, linkedin, instagram
    } = req.body;

    const profileFields = {
      user: req.user.id,
      company,
      website,
      location,
      status,
      bio,
      githubusername,
      skills: typeof skills === 'string' ? skills.split(',').map(skill => skill.trim()) : [],
      experience: Array.isArray(experience) ? experience : [],
      education: Array.isArray(education) ? education : [],
      social: { youtube, twitter, facebook, linkedin, instagram }
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      // Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Profile not found' });
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // Delete user posts
    await Post.deleteMany({ user: req.user.id });
    // Delete profile
    await Profile.findOneAndDelete({ user: req.user.id });
    // Delete user
    await User.findOneAndDelete({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const newExp = { ...req.body };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    profile.experience = profile.experience || [];
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    profile.experience = profile.experience.filter(exp => exp._id.toString() !== req.params.exp_id);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/education
// @desc    Add education
// @access  Private
router.put('/education', [
  auth,
  [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const newEdu = { ...req.body };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    profile.education = profile.education || [];
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    profile.education = profile.education.filter(edu => edu._id.toString() !== req.params.edu_id);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/github/:username
// @desc    Get GitHub repos
// @access  Public
router.get('/github/:username', async (req, res) => {
  try {
    const uri = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`;
    const headers = { 'User-Agent': 'node.js' };

    const githubClientId = config.get('githubClientId');
    const githubClientSecret = config.get('githubClientSecret');

    const params = githubClientId && githubClientSecret ? {
      client_id: githubClientId,
      client_secret: githubClientSecret
    } : {};

    const response = await axios.get(uri, { headers, params });

    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ msg: 'No Github profile found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
