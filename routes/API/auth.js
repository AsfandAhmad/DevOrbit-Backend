const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/Auth');
const User = require('../../models/User');
const JWT = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public


// Register a new user
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is Required').exists(),
    // Validate the request body
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    // Check if user already exists
    // If user already exists, return an error response

    try {
        // Check if user already exists
        let user = await User.findOne({ email });

        // If user exists, return error
         // Check if user already exists in the database
         // If user already exists, return an error response
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Email and Passwod' }] });
            
        }
        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        // If password does not match, return error
        if (!isMatch) { 
            return res.status(400).json({ errors: [{ msg: 'Invalid Email and Pasword' }] });
        }

        // Return jsonwebtoken
        // Save the user to the database
        const payload = {
            user: {
                id: user.id
            }
        };

        JWT.sign(payload, config.get('JWTSecret'),
            { expiresIn: 36000000 }, // Token expiration time
            (err, token) => {
                if (err) throw err;
                // Send the token in the response
                res.json({ token });
            }
        );


    }catch(err) { 
        console.error(err.message);
        res.status(500).send('Server error');
        }


});

module.exports = router;