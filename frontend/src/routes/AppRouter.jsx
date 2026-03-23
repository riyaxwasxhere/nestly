import React from 'react'
import Home from '../features/auth/pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from '../features/auth/pages/AuthPage'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth' element={<AuthPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter