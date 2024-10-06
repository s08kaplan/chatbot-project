"use strict";
const router = require("express").Router();


const Token = require("../controllers/token");

router
.route("/")
.get(Token.list)
.post(Token.create);

router
  .route("/:tokenId")
  .get(Token.read)
  .put(Token.update)
  .patch(Token.update)
  .delete(Token.delete);

  
module.exports = router;