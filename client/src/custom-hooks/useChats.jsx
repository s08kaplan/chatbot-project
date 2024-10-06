import React from 'react'
import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getChats } from '../Slices/chatSlice'

const useChats = () => {
    const { axiosWithToken } = useAxios()
    const dispatch = useDispatch()

    const getChatHistory = async (id="") => {
       dispatch(fetchStart())
       const url = id ? `chats/${id}` : "chats"
        try {
            const { data } = await axiosWithToken(url)
            console.log(data);
            dispatch(getChats({data}))
        } catch (error) {
            console.log(error);
            dispatch(fetchFail(error))
        }
    }

    const postChat = async (postData) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.post("chats",postData)
            console.log(data);
            dispatch(getChats(data))
            await getChatHistory()
        } catch (error) {
          console.log(error);
          dispatch(fetchFail(error))  
        }
    }

    const updateChat = async (id,postData) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.put(`chats/${id}`,postData)
            console.log(data);
            dispatch(getChats(data))
        } catch (error) {
          console.log(error);
          dispatch(fetchFail(error))  
        }
    }
  return {getChatHistory, postChat, updateChat}
}

export default useChats