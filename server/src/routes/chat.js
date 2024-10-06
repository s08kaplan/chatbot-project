"use strict";
const router = require("express").Router();


const Chat = require("../controllers/chat");

router
.route("/")
.get(Chat.list)
.post(Chat.create);

router
  .route("/:chatId")
  .get(Chat.read)
  .put(Chat.update)
  .patch(Chat.update)
  .delete(Chat.delete);

  
module.exports = router;