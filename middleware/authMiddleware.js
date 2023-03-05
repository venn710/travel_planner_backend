const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const app = express()
const verifyToken = async (req, res, next) => {
    console.log("came to validate")
    const token = req.headers["token"];;
    if (!token) {
        res.status(400).send("token is required for authentication")
    }
    else {
        try {
            const data = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY)
            console.log('object :>> ', data);
            return next();
        } catch (error) {
            console.log('object :>> ', error);
            return res.status(400).send(error)
        }
    }
}
module.exports = verifyToken