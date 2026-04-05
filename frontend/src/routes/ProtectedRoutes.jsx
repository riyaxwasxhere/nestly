import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({ children , allowedRole }) {
  const user = useSelector((state)=> state.user.userData)
  if(!user){
    return <Navigate to="/auth" />
  }
  if(allowedRole && user.role !== allowedRole){
    if(user.role === "owner"){
      return <Navigate to="/owner/dashboard" />
    } else if(user.role === "student"){
      return <Navigate to="/student/dashboard" />
    }
  }
  return children
}

export default ProtectedRoutes