const express = require("express");
const morgan = require("morgan");
const app = express();
const general = require('./routes/general');
app.use('/general', general);
app.use(morgan("combined"))

/* This is a middleware function that is executed when the request is not found. */
app.use((req, res) => {
    console.log("Global middleWare for notfound");
    res.status(404).send("Not Found")
})
app.listen(8000, function (req, res) {
    console.log("listening");
});
