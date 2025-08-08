const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Test route
// @access  Public


// Register a new user
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    // Validate the request body
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    // Check if user already exists
    // If user already exists, return an error response

    try {
        // Check if user already exists
        let user = await User.findOne({ email });

        // If user exists, return error
        // Check if user already exists in the database
        // If user already exists, return an error response
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

        }

        // gravatar for user avatar
        // Generate avatar using gravatar
        const avatar = gravatar.url(email, {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mm' // Default image
        });


        // Create new user
        // Create a new user instance
        user = new User({
            name,
            email,
            avatar,
            password
        })
        // Hash password
        // Generate salt and hash the password
        // Hash the password

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        console.log('User registered successfully');

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


    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }


});

module.exports = router;