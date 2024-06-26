const nodemailer = require('nodemailer');
const uuid = require('uuid');
const jsonwebtoken = require('jsonwebtoken');
let otps = {};
const { findAndSaveRegisterDetails } = require('../utils/customer-type-utils');

const requestOtp = async (req, res) => {
    var transporter = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS
            }
        }
    );
    let email = req.params.email;
    let digits = '0123456789';
    let limit = 6;
    let otp = ''
    for (i = 0; i < limit; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    var options = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "OTP for Login",
        html: `<p>Enter the otp: ${otp} to verify your email address</p>`

    };
    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("couldn't send OTP")
        }
        else {
            otps[email] = otp;
            setTimeout(() => {
                delete otps[email]
            }, 300000);
            // Validity for 5mins
            res.status(200).send("Otp Sent Successfully")
        }
    });

}
const registerVerifyOtp = async (req, res, next) => {
    receivedBody = req.body;
    let receivedOtp = receivedBody['otp'];
    let email = receivedBody['email'];
    console.log(otps)
    if (otps[email] == receivedOtp) {
        var generatedUserId = uuid.v4();
        return findAndSaveRegisterDetails(req, res, generatedUserId);
    } else {
        res.status(400).send('INVALID OTP')
    }
}
module.exports = { requestOtp, registerVerifyOtp}