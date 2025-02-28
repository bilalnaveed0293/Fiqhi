const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], // Ensures name is provided
        trim: true // Removes leading/trailing whitespace
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Ensures no duplicate emails
        trim: true,
        lowercase: true // Converts email to lowercase for consistency
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'] // Enforce minimum length
    },
},
{
    timestamps:true
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;