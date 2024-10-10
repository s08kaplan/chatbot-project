import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useAxios from '../custom-hooks/useAxios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useSelector(state => state.auth)
  console.log(user);
  const { axiosWithToken } = useAxios()

  const [userChats, setUserChats] = useState([])
  const navigate = useNavigate()

  const userChat = async () => {
    try {
      const { data } = await axiosWithToken(`chats?filter[userId]=${user?.id}`)
      // const { data } = await axiosWithToken(`chats`);
      console.log(data);
      setUserChats(data?.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userChat()
  }, [])
  
const handleNavigate = (id) => {
  navigate(`/profile/${id}`)
}
console.log(userChats);
  return (
    <section className='flex justify-center items-center p-3'>
        <article className='flex flex-col items-center gap-2'>
          <div>
           <img src={user?.image ? user?.image : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"} alt="user image" width={100} style={{borderRadius:"50%"}} /> 
          </div>
          <h4>{user?.username}</h4>
        </article>
<article>
  <div>
    {userChats?.map(chat => (
      <div key={chat._id} onClick={() => handleNavigate(chat?._id)} className='cursor-pointer'>
        {new Date(chat.sessionEnd).toLocaleDateString()}
        {chat.chat[0]?.question}  {/*First chat first question selected to show*/}
      </div>
    )) }
  </div>
</article>
    </section>
  )
}

export default Profile