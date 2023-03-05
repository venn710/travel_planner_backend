const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const app = express();
const general = require('./routes/generalRoute');
const auth = require('./routes/authRoute');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/authMiddleware')
dotenv.config();
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use('/api/v1/auth', auth);
app.use('/', authMiddleware);
app.use('/api/v1/general', general);
app.use(morgan("combined"))
/* This is a middleware function that is executed when the request is not found. */

app.use((req, res) => {
  console.log("Global middleWare for notfound");
  res.status(404).send("Not Found")
})

app.listen(8000, function (req, res) {
  console.log("listening");
});
