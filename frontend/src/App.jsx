import React from 'react'
import AppRouter from './routes/AppRouter.jsx'
import {Provider} from 'react-redux'
import {store} from './redux/store.js'
import { BrowserRouter } from 'react-router-dom'

export const serverUrl = "http://localhost:8000"

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
      
    </Provider>
  )
}

export default App
