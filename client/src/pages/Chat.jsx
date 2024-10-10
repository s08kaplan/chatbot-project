import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxios from "../custom-hooks/useAxios";
import SendButton from "../components/SendButton";
import useChats from "../custom-hooks/useChats";
import logo from "../assets/chat.png";
import ChatCard from "../components/ChatCard";

const Chat = () => {
  const { user } = useSelector((state) => state.auth);
  const { chat, chatDetail } = useSelector((state) => state.chat);
  // console.log(user);
  // console.log(chat);
  // console.log(chatDetail);
  // console.log(chat[0]?._id);

  const { axiosWithToken } = useAxios();
  const { getChatHistory, postChat, updateChat } = useChats();

  const [currentQuestion, setCurrentQuestion] = useState(
    JSON.parse(sessionStorage.getItem("lastQuestion")) || 1
  );

  const [questionAnswer, setQuestionAnswer] = useState({
    question: "",
    answer: "",
    nextQuestion: 2,
  });

  // console.log(questionAnswer.question);
  console.log(questionAnswer.nextQuestion);
  // console.log(currentQuestion);

  const getCurrentQuestionNumber = async () => {
    try {
      const { data } = await axiosWithToken(
        `questions?filter[currentQuestion]=${currentQuestion}`
      );
      // console.log(data);
      setQuestionAnswer((prev) => ({
        ...prev,
        question: data?.data[0]?.question,
        nextQuestion: data?.data[0]?.nextQuestion,
      }));
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const chatHistoryData = await getChatHistory();
        await getCurrentQuestionNumber();
        // await userChat();
        // console.log(chatHistoryData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChatData();
  }, [currentQuestion]);


  const handleChange = (e) => {
    // console.log(e.target.value);
    setQuestionAnswer((prev) => ({ ...prev, answer: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (chat && !chat[0]?._id) {
      const postData = {
        userId: user?.id,
        chat: [
          {
            question: questionAnswer.question,
            answer: questionAnswer.answer,
          },
        ],
      };
      // console.log(postData);
      await postChat(postData);
    } 
    else {
      const postData = {
        userId: user?.id,
        chat: [
          {
            question: questionAnswer.question,
            answer: questionAnswer.answer,
          },
        ],
      };
      // console.log("update post: ", postData);
      await updateChat(chat[0]?._id, postData);
      await getChatHistory();
    }
    const nextQuestion = currentQuestion + 1;
    sessionStorage.setItem("lastQuestion", JSON.stringify(nextQuestion));
    setCurrentQuestion(nextQuestion);
    setQuestionAnswer((prev) => ({
      ...prev,
      answer: "",
    }));
  };

  return (
<section className="flex flex-col text-center w-full px-4 sm:px-6 lg:px-8">
  <h3 className="text-lg md:text-xl">Welcome {user?.username}</h3>
{/*   
  <article>
    {!chat ? (
      <section className="relative mb-5 flex flex-col">
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[90%] sm:max-w-[70%] lg:max-w-[50%] bg-gray-200 rounded-lg shadow-md p-3">
          <span className="font-semibold">Chatbot</span>
          <span className="text-sm sm:text-base">{questionAnswer.question}</span>
        </div>
        <div className="flex flex-col sm:flex-row items-end sm:items-start justify-end mt-3 sm:mt-0">
          <div className="flex gap-2 p-3 bg-gray-200 rounded-lg shadow-md w-full sm:w-auto sm:ml-3">
            <span className="text-sm sm:text-base">{user?.username}</span>
          </div>
        </div>
      </section>
    ) : (
      chat[0]?.chat?.map((item) => (
        <>
          <section
            key={item.question}
            className="relative p-5 flex flex-col justify-between"
          >
            <div className="flex flex-col sm:flex-row gap-3 h-full bg-gray-500 p-4 rounded-lg shadow-md sm:w-full md:w-[75%] lg:w-[50%] mt-1">
              <img src={logo} alt="logo" width={30} height={30} className="rounded-full" />
              <div className="flex flex-col items-start">
                <span className="font-semibold">Chatbot</span>
                <span className="text-sm sm:text-base">{item.question}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end sm:items-start justify-end mt-3 sm:mt-2">
              <div className="flex gap-3 p-4 bg-gray-500 rounded-lg shadow-md w-full sm:w-auto sm:ml-3">
                <span className="text-sm sm:text-base">{item.answer}</span>
                <div className="flex gap-2 items-center mx-5">
                  <span className="font-semibold">{user?.username}</span>
                <img
                  src={
                    user?.image
                      ? user?.image
                      : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
                  }
                  alt="user image"
                  width="30px"
                  height="20px"
                  className="rounded-full object-contain"
                />
                </div>
                
              </div>
            </div>
          </section>
          <hr className="my-6" />
        </>
      ))
    )}
  </article> */}
     <ChatCard/>
  <article>
    {questionAnswer.nextQuestion ? (
      <>
        <div className="p-2 flex flex-col sm:flex-row gap-5">
          <h4 className="font-semibold">Chatbot</h4>
          <h4 className="text-sm sm:text-base">{questionAnswer.question}</h4>
        </div>
        <div className="flex justify-end">
          <h4 className="w-full p-2 text-right text-sm sm:text-base">{user?.username}</h4>
        </div>
      </>
    ) : (
      <span>End of session, thank you</span>
    )}
  </article>

  <div className="mt-2 p-3 flex justify-center items-center gap-2 w-full">
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
      onChange={handleChange}
      className="block w-full max-w-[80%] md:max-w-[60%] lg:max-w-[50%] rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
    />
  </div>
</section>

  );
};

export default Chat;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import useAxios from "../custom-hooks/useAxios";
// import SendButton from "../components/SendButton";
// import useChats from "../custom-hooks/useChats";
// import logo from "../assets/chat.png"

// const Chat = () => {
//   const { user } = useSelector((state) => state.auth);
//   const { chat, chatDetail } = useSelector((state) => state.chat);
//   console.log(user);
//   console.log(chat);
//   console.log(chatDetail);

//   const { axiosWithToken } = useAxios();
//   const { getChatHistory, postChat, updateChat } = useChats();

//   // Initialize currentQuestion from sessionStorage or fallback to 1
//   const [currentQuestion, setCurrentQuestion] = useState(
//     JSON.parse(sessionStorage.getItem("lastQuestion")) || 1
//   );

//   const [questionAnswer, setQuestionAnswer] = useState({
//     question: "",
//     answer: "",
//   });

//   console.log(questionAnswer.question);
//   console.log(currentQuestion);

//   // Fetch question based on the current question number
//   const fetchQuestion = async () => {
//     try {
//       const { data } = await axiosWithToken(
//         `questions?filter[currentQuestion]=${currentQuestion}`
//       );
//       console.log(data);
//       setQuestionAnswer((prev) => ({
//         ...prev,
//         question: data?.data[0]?.question,
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch user chat history
//   const fetchUserChat = async () => {
//     try {
//       const { data } = await axiosWithToken(`chats?filter[userId]=${user?.id}`);
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch chat history and the question on component mount or when `currentQuestion` changes
//   useEffect(() => {
//     const fetchChatData = async () => {
//       try {
//         await getChatHistory();
//         await fetchQuestion();
//         await fetchUserChat();
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchChatData();
//   }, [currentQuestion]); // Only re-run when `currentQuestion` changes

//   const handleChange = (e) => {
//     console.log(e.target.value);
//     setQuestionAnswer((prev) => ({ ...prev, answer: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const postData = {
//       userId: user?.id,
//       chat: [
//         {
//           question: questionAnswer.question,
//           answer: questionAnswer.answer,
//         },
//       ],
//     };

//     // Determine if chat exists
//     if (!chat[0]?._id) {
//       await postChat(postData);
//     } else {
//       await updateChat(chat[0]?._id, postData);
//     }

//     // Increment the current question and update sessionStorage
//     const nextQuestion = currentQuestion + 1;
//     sessionStorage.setItem("lastQuestion", JSON.stringify(nextQuestion));
//     setCurrentQuestion(nextQuestion);

//     // Clear the answer field
//     setQuestionAnswer((prev) => ({
//       ...prev,
//       answer: "",
//     }));
//   };

//   return (
//     <section className="flex flex-col text-center">
//       <h3>Welcome {user?.username}</h3>
//       <h4>If you are ready I want to ask you some questions about animals?</h4>
//       <article>
//         {!chat ? (
//           <section className="relative mb-5 flex flex-col">
//             <div className="absolute left-0 p-2 flex gap-2">
//               <span>Chatbot</span>
//               <span>{questionAnswer.question}</span>
//             </div>
//             <div className="absolute right-0 top-10 p-3">{user?.username}</div>
//           </section>
//         ) : (
//           chat[0]?.chat?.map((item) => (
//             <>
//               <section
//                 key={item.question}
//                 className="relative p-5 flex flex-col justify-between"
//               >
//                 <div className="flex gap-3 h-full bg-gray-500 sm:w-[30%] md:w-[50%] lg:w-[80%] mt-1">
//                   <img src={logo} alt="logo" width={30} height={30} />
//                   <span>Chatbot</span>
//                   <span className="">{item.question}</span>
//                 </div>
//                 <div className="absolute right-0 top-[50px] p-2 flex gap-3 bg-gray-500">
//                   <span className="">{item.answer}</span>
//                   <span className="">{user?.username}</span>
//                   <img src={user?.image} alt="user image" width={30} style={{borderRadius:".5rem"}} />
//                 </div>
//               </section>
//               <hr style={{marginTop:"2.5rem"}}/>
//             </>
//           ))
//         )}
//       </article>
//       <article>
//         <div className="p-2 flex gap-5">
//           <h4>Chatbot</h4>
//           <h4>{questionAnswer.question}</h4>
//         </div>
//         <div className=" flex ">
//           <h4 className="w-full p-2 text-right">{user?.username}</h4>
//         </div>
//       </article>
//       <div className="mt-2 p-3 flex justify-center items-center gap-2">
//         <SendButton
//           disabled={questionAnswer.answer?.trim() === ""}
//           onSubmit={handleSubmit}
//         />
//         <input
//           id="answer"
//           name="answer"
//           value={questionAnswer.answer}
//           type="text"
//           required
//           onChange={handleChange}
//           className="block w-[30rem] rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//         />
//       </div>
//     </section>
//   );
// };

// export default Chat;
