const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rejection-rate.firebaseio.com"
});

const db = admin.firestore();

exports.create = async (req, res) => {
    try {
        await db.collection('questions').doc('/' + req.body.id + '/')
            .create({question: req.body.question});
        
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

exports.getAll = async (req, res) => {
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

            return response;
        });
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

exports.getOne = async (req, res) => {
    try {
        const document = db.collection('questions').doc(req.params.question_id);
        let question = await document.get();
        let response = question.data();
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

exports.update = async (req, res) => {
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
};

exports.delete = async (req, res) => {
    try {
        const document = db.collection('questions').doc(req.params.question_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
