"use strict";

module.exports = async function () {
  
  const { mongoose } = require("../configs/dbConnection");
  await mongoose.connection.dropDatabase();
  console.log("!!!Database and all data in it DELETED!!!!");
  
  const User = require("../models/user");

  await User.create([
    {
      _id: "65343222b67e9681f937f511",
      username: "admin",
      password: "Admin123*",
      email: "admin@gmail.com",
      isAdmin: true,
    },

    {
      _id: "65343222b67e9681f937f514",
      username: "Ali",
      password: "Ali1234*",
      email: "ali@gmail.com",
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f515",
      username: "Veli",
      password: "Veli123*",
      email: "veli@gmail.com",
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f516",
      username: "Danny",
      password: "Danny123*",
      email: "danny@gmail.com",
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f517",
      username: "Jenny",
      password: "Jenny123*",
      email: "jenny@gmail.com",
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f518",
      username: "Daniel",
      password: "Daniel123*",
      email: "daniel@gmail.com",
      isAdmin: false,
    },
  ]);

  console.log("****Users added****");
  console.log("***Questions started to add***");

  const Question = require("../models/question")
  await Question.create([
    {
      "_id": "64f2b947cfe5fa36a59871b2",
      "question": "Do you like animals?",
      "currentQuestion": 1,
      "nextQuestion": 2
    },
    {
      "_id": "64f2b947cfe5fa36a59871b3",
      "question": "What is your favorite breed of cat, and why?",
      "currentQuestion": 2,
      "nextQuestion": 3
    },
    {
      "_id": "64f2b947cfe5fa36a59871b4",
      "question": "How do you think cats communicate with their owners?",
      "currentQuestion": 3,
      "nextQuestion": 4
    },
    {
      "_id": "64f2b947cfe5fa36a59871b5",
      "question": "Have you ever owned a cat? If so, what was their name and personality like?",
      "currentQuestion": 4,
      "nextQuestion": 5
    },
    {
      "_id": "64f2b947cfe5fa36a59871b6",
      "question": "Why do you think cats love to sleep in small, cozy places?",
      "currentQuestion": 5,
      "nextQuestion": 6
    },
    {
      "_id": "64f2b947cfe5fa36a59871b7",
      "question": "What’s the funniest or strangest behavior you’ve ever seen a cat do?",
      "currentQuestion": 6,
      "nextQuestion": 7
    },
    {
      "_id": "64f2b947cfe5fa36a59871b8",
      "question": "Do you prefer cats or kittens, and what’s the reason for your preference?",
      "currentQuestion": 7,
      "nextQuestion": 8
    },
    {
      "_id": "64f2b947cfe5fa36a59871b9",
      "question": "Why do you think cats are known for being independent animals",
      "currentQuestion": 8,
      "nextQuestion": 9
    },
    {
      "_id": "64f2b947cfe5fa36a59871ba",
      "question": "How do you think cats manage to land on their feet when they fall?",
      "currentQuestion": 9,
      "nextQuestion": 10
    },
    {
      "_id": "64f2b947cfe5fa36a59871bb",
      "question": "What’s your favorite fact or myth about cats?",
      "currentQuestion": 10,
      "nextQuestion": 11
    },
    {
      "_id": "64f2b947cfe5fa36a59871bc",
      "question": "How would you describe the relationship between humans and cats in three words?",
      "currentQuestion": 11,
      "nextQuestion": 12
    },
   
  ]
  )
console.log("*******Questions added*****")
console.log("sync process finished successfully");
};