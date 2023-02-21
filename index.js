const express = require("express");

const app = express();

app.get('/', function first(req, res) {
    res.send("Hellooo");
});
app.listen(8000, function second(req, res) {
    console.log("listening");
});
