const firebaseApp = require('firebase/app');
const firebaseAuth = require('firebase/auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { requestOtp,registerVerifyOtp } = require('../controllers/authController');

// Middleware
router.use('/', async (req, res, next) => {
    console.log("firstFunctionss is Fired");
    console.log("request is" + (req.originalUrl));
    console.log("request is" + (req.params));
    await mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then((result) => {
        console.log("Connected to DB");
        return next();
    }).catch((err) => {
        return res.status(400).send("DB Connection Failed");
    });
});
router.get('/login/otp/:email', requestOtp)
router.post('/login/otp/register-otp', registerVerifyOtp)
router.use('/', (req, res) => {
    return res.status(404).send("Not found")
})
module.exports = router;