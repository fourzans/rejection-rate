interface Question {
    id: String,          // id of the question so you can get/edit/remove by id
    timestamp: Number,   // output from Date.now()
    question: String,    // the ask
    askee: String,       // person asked
    status: String       // 'Accepted', 'Rejected', 'Unanswered'
};
