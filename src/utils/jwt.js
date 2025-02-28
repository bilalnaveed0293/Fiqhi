const jwt = require('jsonwebtoken');

const generateToken = (userId, role, rememberMe) => {
    return jwt.sign(
        { userId, role }, // Payload: user ID and role
        process.env.JWT_SECRET, // Secret key from .env
        { expiresIn: rememberMe ? '30d' : '1h' } // Expiration: 30 days if rememberMe, 1 hour if not
    );
};

module.exports = { generateToken };