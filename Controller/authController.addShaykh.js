const Shaykh = require('../models/shaykh.models');

const addNewShaykh = async (req, res) => {
    try {
        const { firstName, lastName, email, yearsOfExperience, educationalInstitution, phoneNumber, address } = req.body;

        // Validate incoming data
        if (!firstName || !lastName || !email || yearsOfExperience === undefined || !educationalInstitution || !phoneNumber || !address) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if email already exists
        const existingShaykh = await Shaykh.findOne({ email });
        if (existingShaykh) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create and save the new Shaykh
        const newShaykh = new Shaykh({
            firstName,
            lastName,
            email,
            yearsOfExperience,
            educationalInstitution,
            phoneNumber,
            address,
        });

        await newShaykh.save();

        // Send success response
        res.status(201).json({ message: 'Shaykh added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding Shaykh', error: error.message });
    }
};

module.exports = addNewShaykh;