module.exports = app => {
    const questions = require("../controllers/question.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", questions.create);
  
    router.get("/", questions.getAll);
    
    router.get("/:question_id", questions.getOne);
  
    router.put("/:question_id", questions.update);
  
    router.delete("/:question_id", questions.delete);
    
    app.use('/api/question', router);
};
