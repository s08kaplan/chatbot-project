const {
    mongoose: { Schema, model },
  } = require("../configs/dbConnection");
  
  const QuestionSchema = new Schema(
    {
  
      question: {
        type:String,
        trim:true,
        required:true,
      },
      currentQuestion:Number,
      nextQuestion:Number,
      
    },
    {
      collection: "questions",
      timestamps: true,
    }
  );
  
  module.exports = model("Question", QuestionSchema);
  