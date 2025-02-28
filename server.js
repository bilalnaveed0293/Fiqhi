const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authControllersign = require('./Controller/authController.signup');
const authControllerlogin = require('./Controller/authController.login');
const authControllerShaykh = require('./Controller/authController.addShaykh');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

// Define routes using the controller functions
app.post('/api/signup', authControllersign);
app.post('/api/login', authControllerlogin);
app.post('/api/addshaykh', authControllerShaykh); 

app.get('/', (req, res) => {
    console.log("Hello jee");
    res.send("Hello jee");
});

app.listen(port, () => {
    console.log("Server is listening on port:", port);
});