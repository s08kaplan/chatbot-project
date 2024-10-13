import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useAxios from '../custom-hooks/useAxios'
import { useParams } from 'react-router-dom'
import logo from "../assets/chat.png";
import useChats from '../custom-hooks/useChats';


const ChatCard = () => {
    const { user } = useSelector(state => state.auth)
    const { chat } = useSelector(state => state.chat)
    const { axiosWithToken } = useAxios()
    const { chatDetailId } = useParams()
    const [chats, setChats] = useState([])
    const { getChatHistory } = useChats()
    const getDetail = async () => {
        try {
         const { data } = await axiosWithToken(`chats?filter[_id]=${chatDetailId}`)  
         console.log(data); 
         setChats(data?.data)
        } catch (error) {
           console.log(error); 
        }   
    }
    useEffect(() => {
      chatDetailId ?  getDetail() : getChatHistory()
    chat && setChats(chat) 
    }, [chatDetailId])
    console.log(user);
    console.log(chats);
    console.log("use selector chat :", chat);
  return (
    <article>
    {(!chatDetailId && !chats) ? (
      <section className="relative mb-5 flex flex-col">
        {/* <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[90%] sm:max-w-[70%] lg:max-w-[50%] bg-gray-200 rounded-lg shadow-md p-3">
          <span className="font-semibold">Chatbot</span>
          <span className="text-sm sm:text-base">question</span>
        </div>
        <div className="flex flex-col sm:flex-row items-end sm:items-start justify-end mt-3 sm:mt-0">
          <div className="flex gap-2 p-3 bg-gray-200 rounded-lg shadow-md w-full sm:w-auto sm:ml-3">
            <span className="text-sm sm:text-base">{user?.username}</span>
          </div>
        </div> */}
        <div>Let's begin</div>
      </section>
    ) : (
      chats[0]?.chat?.map((item) => (
        <>
          <section
            key={item.question}
            className="relative p-5 flex flex-col justify-between"
          >
            {/* Chatbot Message */}
            <div className="flex flex-col sm:flex-row gap-3 h-full bg-gray-500 p-4 rounded-lg shadow-md sm:w-full md:w-[75%] lg:w-[50%] mt-1">
              <img src={logo} alt="logo" width={30} height={30} className="rounded-full" />
              <div className="flex flex-col items-start">
                <span className="font-semibold">Chatbot</span>
                <span className="text-sm sm:text-base">{item.question}</span>
              </div>
            </div>

            {/* User Response */}
            <div className="flex flex-col sm:flex-row items-end sm:items-start justify-end mt-3 sm:mt-2">
              <div className="flex items-center gap-3 p-4 bg-gray-500 rounded-lg shadow-md w-full sm:w-auto sm:ml-3">
                <span className="text-sm sm:text-base">{item.answer}</span>
                <div className="flex flex-col-reverse gap-2 items-center mx-5">
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
  </article>
  )
}

export default ChatCard