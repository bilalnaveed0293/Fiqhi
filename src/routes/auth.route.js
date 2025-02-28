const express = require('express')
const signup = require('../Controller/authController.signup')

const router = express.Router();

router.post("/signup", signup);