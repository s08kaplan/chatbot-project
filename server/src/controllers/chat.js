"use strict";

const Chat = require("../models/chat");
// const axios = require("axios")
// const openAiApiKey = process.env.CHAT_API_KEY

// const openAiInstance = axios.create({
//     baseURL : "https://api.openai.com/v1/",
//     headers: {
//         Authorization: `Bearer ${openAiApiKey}`,
//         'Content-Type': 'application/json'
//     }
// })



module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Chat);

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
  
    const data = await Chat.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {

    const data = await Chat.findOne({ _id: req.params.chatId });

    res.status(202).send({
      error: false,
      data,
    });
  },

  // update: async (req, res) => {
  //   const { chat } = req.body;

  //   const chatSession = await Chat.findOne({ _id: req.params.chatId });
  //   console.log(chatSession);
  //   const existingQuestion = chatSession.chat.find(
  //     (item) => item.question.toString() === chat[0].question.toString()
  //   );

  //   // If the question is already asked send  warning
  //   if (existingQuestion) {
  //      res.status(200).send({
  //       error: false,
  //       message: "Question already exists.",
  //       data: chatSession,
  //     });
  //   } else {
  //     // If the question does not exist, push the new chat to the array
  //     chatSession.chat.push({
  //       question: chat[0].question,
  //       answer: chat[0].answer,
  //     })
  //   }

  //   // Save the updated Chat document
  //   await chatSession.save();
  //   const data = await Chat.findOne({ _id: req.params.chatId });
  //   res.status(202).send({
  //     error: false,
  //     data,
  //   });
  // },

  update: async (req, res) => {
    const { chat } = req.body;

    // Find the existing chat session
    const chatSession = await Chat.findOne({ _id: req.params.chatId });
    if (!chatSession) {
        return res.status(404).send({
            error: true,
            message: "Chat session not found.",
        });
    }

    console.log(chatSession);

    // Check if the question already exists
    const existingQuestion = chatSession.chat.find(
      (item) => item.question.toString() === chat[0].question.toString()
    );

    // If the question already exists, send a warning response
    if (existingQuestion) {
        return res.status(200).send({
            error: false,
            message: "Question already exists.",
            data: chatSession,
        });
    } 

    // If the question does not exist, add the new chat to the array
    chatSession.chat.push({
        question: chat[0].question,
        answer: chat[0].answer,
    });

    // Save the updated Chat document
    await chatSession.save();

    // Fetch the updated chat session and send the response
    const data = await Chat.findOne({ _id: req.params.chatId });
    return res.status(202).send({
        error: false,
        data,
    });
},

  delete: async (req, res) => {
    const data = await Chat.deleteOne({ _id: req.body.chatId });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !!!data.deletedCount,
      data,
    });
  },
};