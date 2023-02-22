const express = require('express');
const router = express.Router();
const app = express()
// Middleware
router.use('/', (req, res, next) => {
    console.log("firstFunctionss is Fired");
    next();
})
router.get('/', (req, res, next) => {
    next()
    // res.status(200).send("Hello!!!!!!");
},
    /* A middleware function. */
    (req, res, next) => {
        console.log("insideFUnction is called");
        next(); // so it will be return next inorder to return and terminate the execution from here
        console.log("insideFUnction after next is called");

    },
    (req, res, next) => {
        console.log("insideInsideFUnction is called");
        res.status(200).send("Hello!!!!!!");
    },
);

// We never reach this middleWare if the req matches to any of the above paths like ('/')
// because if it matches it will complete request - response cycle so it won't come
router.use((req, res, next) => {
    console.log('secondFunction is fired');
    next();
})

module.exports = router