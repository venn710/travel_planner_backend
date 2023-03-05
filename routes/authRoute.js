const firebaseApp = require('firebase/app');
const firebaseAuth = require('firebase/auth');
const express = require('express');
const router = express.Router();

const { requestOtp,validateOtp } = require('../controllers/authController');

// Middleware
router.use('/', (req, res, next) => {
    console.log("firstFunctionss is Fired");
    console.log("request is" + (req.originalUrl));
    console.log("request is" + (req.params));
    next();
});
router.get('/login/otp/:email', requestOtp)
router.post('/login/otp', validateOtp)
module.exports = router;