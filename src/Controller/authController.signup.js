const bcrypt = require('bcrypt');
const User = require('../models/user.models');
const { generateToken } = require('../utils/jwt'); // Import the JWT utility

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate JWT token using the utility
        // Since signup doesn't have a rememberMe field, default to a shorter expiration (e.g., 1 hour)
        const token = generateToken(newUser._id, newUser.role, false);

        res.status(201).json({
            message: 'User created successfully',
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
            token // Include the token in the response
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

module.exports = signup;