import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const handleNavigate = () => {
        token ? navigate("/chat") : navigate("/login") 
    }
   
    
  return (
    <section>
            <h1 className='text-center py-3'>Welcome to Chatbot </h1>
        <article className='h-dvh flex flex-col justify-center items-center'>
            <button onClick={handleNavigate} className="font-medium border border-lime-500 rounded-lg p-3 text-quaternary hover:text-tertiary">Go Chat page</button>  
        </article>
    </section>
  )
}

export default Home