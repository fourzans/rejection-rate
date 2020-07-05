const express = require('express');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rejection-rate.firebaseio.com"
});
