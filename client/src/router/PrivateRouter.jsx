import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Link } from "react-router-dom"

const PrivateRouter = () => {
const { token } = useSelector(state=> state.auth)
  return token ? <Outlet/> : <Link to = "/login" />
}

export default PrivateRouter