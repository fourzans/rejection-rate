const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rejection-rate.firebaseio.com"
});
const db = admin.firestore();

app.post('/api/question', (req, res) => {
    (async () => {
        try {
            await db.collection('questions').doc('/' + req.body.id + '/')
                .create({question: req.body.question});
            
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// read item
app.get('/api/question/:question_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('questions').doc(req.params.question_id);
            let question = await document.get();
            let response = question.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// read all
app.get('/api/question', (req, res) => {
    (async () => {
        try {
            let query = db.collection('questions');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedQuestion = {
                        id: doc.id,
                        question: doc.data().question
                    };
                    response.push(selectedQuestion);
                }
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// update
app.put('/api/question/:question_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('questions').doc(req.params.question_id);
            await document.update({
                question: req.body.question
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// delete
app.delete('/api/question/:question_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('questions').doc(req.params.question_id);
            await document.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

exports.app = functions.https.onRequest(app);
