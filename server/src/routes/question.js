"use strict";
const router = require("express").Router();


const Question = require("../controllers/question");

router
.route("/")
.get(Question.list)
.post(Question.create);

router
  .route("/:questionId")
  .get(Question.read)
  .put(Question.update)
  .patch(Question.update)
  .delete(Question.delete);

  
module.exports = router;