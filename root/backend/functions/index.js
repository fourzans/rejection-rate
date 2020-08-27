const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors({ origin: true }));

require("./routes/question.routes")(app);

exports.app = functions.https.onRequest(app);
