import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import useAxios from '../custom-hooks/useAxios'
import { useSelector } from 'react-redux'
import ChatCard from '../components/ChatCard'

const UserChatDetail = () => {
    const { user } = useSelector(state => state.auth)
    const { chatDetailId } = useParams()
    const { axiosWithToken } = useAxios()
    const [chatDetail, setChatDetail] = useState([])
    const getDetail = async () => {
        try {
         const { data } = await axiosWithToken(`chats?filter[_id]=${chatDetailId}`)  
         console.log(data); 
         setChatDetail(data?.data)
        } catch (error) {
           console.log(error); 
        }   
    }
    useEffect(() => {
     getDetail()
    }, [])
    console.log(user);
  return (
    <section className='p-3'>
        {/* <main className='flex justify-start gap-2'>
            <article className='flex flex-col gap-2'>
                <h3>{user?.username} chats</h3>
                <section className='flex gap-3'>
                 <span>{new Date(chatDetail[0]?.sessionStart).toLocaleDateString()}</span>
                 <span>{new Date(chatDetail[0]?.sessionStart).toLocaleTimeString()}</span>
                </section>
                <div>
                {chatDetail[0]?.chat?.map(item => (
                    <section className='flex flex-col gap-2 min-w-full'>
                       <span className='bg-gray-500'>{item.question}</span> 
                       <span className='bg-gray-500'>{item.answer}</span>
                       <hr/>
                    </section>
                ))}
                </div>
            </article>
        </main> */}
        <ChatCard/>
    </section>
  )
}

export default UserChatDetail