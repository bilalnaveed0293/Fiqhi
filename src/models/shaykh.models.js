const mongoose = require('mongoose')

const addShaykh = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Ensures no duplicate emails
        trim: true,
        lowercase: true,
    },
    yearsOfExperience: {
        type: Number,
        required: [true, 'Years of experience is required'],
        min: [0, 'Years of experience cannot be negative']
    },
    educationalInstitution: {
        type: String,
        required: [true, 'Educational institution is required'],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
},
{
    timestamps: true // Adds createdAt and updatedAt fields
}
);

const newShaykh = mongoose.model('newShaykh', addShaykh);
module.exports = newShaykh;
