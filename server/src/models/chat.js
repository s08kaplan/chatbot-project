"use strict";

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const ChatSchema = new Schema(
  {

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true,
        required: true,
      },

    chat: [
      {
        question: String,
        answer: { 
            type: String,
            trim: true, 
            required: true 
        },
        createdAt:{
            type: Date, 
            default: Date.now
        }
      },
    ],
  },
  {
    collection: "chats",
    timestamps: {
        createdAt: "sessionStart",
        updatedAt: "sessionEnd"
    },
  }
);

module.exports = model("Chat", ChatSchema);
