import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxios from "../custom-hooks/useAxios";
import SendButton from "../components/SendButton";
import useChats from "../custom-hooks/useChats";

const Chat = () => {
  const { user } = useSelector((state) => state.auth);
  const { chat } = useSelector((state) => state.chat);
  console.log(user);
  console.log(chat);
  // console.log(chat[0]?._id);
  
  const { axiosWithToken } = useAxios();
  const { getChatHistory, postChat, updateChat } = useChats();

  const [questionAnswer, setQuestionAnswer] = useState({
    questions: [],
    answer: "",
    currentQuestion: JSON.parse(sessionStorage.getItem("lastQuestion")) || 1,
    nextQuestion: null,
  });
  // const [chatHistory, setChatHistory] = useState(chat[0]?.chat);

  // console.log(chatHistory);

  // const chatBotQuestionAnswers = async () => {
  //   try {
  //     const { data } = await axiosWithToken(
  //       "questions?limit=11&sort[currentQuestion]=asc"
  //     );
  //     console.log(data);
  //     setQuestionAnswer((prev) => ({
  //       ...prev,
  //       questions: data?.data,
  //       currentQuestion:questionAnswer.currentQuestion + 1,

  //     }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log(JSON.parse(sessionStorage.getItem("lastQuestion")));
  console.log(questionAnswer);
  console.log(questionAnswer.questions);
  console.log(questionAnswer.currentQuestion);

  const deneme = async () => {
    try {
      const { data } = await axiosWithToken(
        `questions?filter[currentQuestion]=${questionAnswer.currentQuestion + 1}`
      );
      console.log(data);
      // setChatHistory(data?.data);
      setQuestionAnswer(prev => ({
        ...prev, questions:data?.data
      }))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        
        const chatHistoryData = await getChatHistory();
        console.log(chatHistoryData);
       

      
      } catch (error) {
        console.log(error);
      }
    };

    fetchChatData();
    deneme();
  }, [questionAnswer.currentQuestion]);



  const handleChoice = (e) => {
    const { textContent } = e.target;
    console.log(textContent);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setQuestionAnswer((prev) => ({ ...prev, answer: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setQuestionAnswer((prev) => ({
    //   ...prev,
    //   answer: e.target.value,
    // }));

    if (!chat[0]?._id) {
      const postData = {
        userId: user?.id,
        chat: [
          {
            question: questionAnswer.questions[0]?.question,
            answer: questionAnswer.answer,
          },
        ],
      };
      console.log(postData);
      postChat(postData);
      sessionStorage.setItem("lastQuestion", JSON.stringify(1));
    } else {
    const  postData = {
        userId: user?.id,
        chat: [
          {
            question: questionAnswer.questions[0]?.question,
            answer: questionAnswer.answer,
          },
        ],
      };
      console.log(postData);
      updateChat(chat[0]?._id, postData);
      sessionStorage.setItem(
        "lastQuestion",
        JSON.stringify(questionAnswer.currentQuestion + 1)
      );
    }
    setQuestionAnswer(prev => ({
      ...prev, answer: ""
    }))
  };
  // console.log(questionAnswer.questions?.data[0].question);
  return (
    <section className="flex flex-col text-center">
      <h3>Welcome {user?.username}</h3>
      <h4>If you are ready i want to ask you some questions about animals?</h4>
      <button onClick={handleChoice}>Yes</button>
      <button onClick={handleChoice}>No, later</button>
      <article>
        {chat[0]?.chat?.map(item => (
          <section className="relative p-5 flex flex-col  justify-between">
            <div className="flex gap-3">
              <span>Chatbot</span>
              <span className="">{item.question}</span>
            </div>
            <div className="absolute right-0 flex gap-3">
              <span className="">{item.answer}</span>
              <span>{user?.username}</span>
            </div>
           
          </section>
        ))}
      </article>
      <article>
        <div className="p-2 flex gap-5">
          <h4>Chatbot</h4>
          <h4>
            {questionAnswer.questions?.map(question => (
              <span key={question.question}>{question.question}</span>

            ))}
          </h4>
        </div>
        <div className=" flex ">
          <h4 className="w-full p-2 text-right">{user?.username}</h4>
        </div>
      </article>
      <div className="mt-2 p-3 flex justify-center items-center gap-2">
        <SendButton
          disabled={questionAnswer.answer?.trim() === ""}
          onSubmit={handleSubmit}
        />
        <input
          id="answer"
          name="answer"
          value={questionAnswer.answer}
          type="text"
          required
          aria-autocomplete="false"
          onChange={handleChange}
          className="block w-[30rem] rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </section>
  );
};

export default Chat;


