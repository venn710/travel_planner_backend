const express = require('express');
const router = express.Router();
const app = express()
var https = require('https');


// Middleware
router.use('/', (req, res, next) => {
    console.log("firstFunctionss is Fired");
    next();
})
router.get('/books', (req, res, next) => {
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

// Testing
// router.get('/weather', async (req, res) => {
//     let data = {
//         "coord":
//         {
//             "lon": -0.1257, "lat": 51.5085
//         },
//         "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }],
//         "base": "stations",
//         "main": { "temp": 7.42, "feels_like": 4.3, "temp_min": 5.95, "temp_max": 8.71, "pressure": 1026, "humidity": 75 },
//         "visibility": 10000,
//         "wind": { "speed": 5.14, "deg": 50 },
//         "clouds": { "all": 100 },
//         "dt": 1677681775,
//         "sys": { "type": 2, "id": 2075535, "country": "GB", "sunrise": 1677653209, "sunset": 1677692363 },
//         "timezone": 0, "id": 2643743, "name": "London", "cod": 200
//     }
//     res.status(200).send(data)
// }
// )


// We never reach this middleWare if the req matches to any of the above paths like ('/')
// because if it matches it will complete request - response cycle so it won't come
router.use((req, res, next) => {
    console.log('secondFunction is fired');
    next();
})

module.exports = router