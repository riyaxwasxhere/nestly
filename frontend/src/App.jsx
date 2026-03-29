import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './routes/AppRouter.jsx'

export const serverUrl = "http://localhost:5173"
const App = () => {
  return (
    <>
      <AppRouter/>
    </>
  )
}

export default App
