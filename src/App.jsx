import React from 'react'
import PageContainer from './components/layouts/PageContainer.jsx'
import Navbar from './components/layouts/Navbar.jsx'
import Footer from './components/layouts/Footer.jsx'

const App = () => {
  return (
    <div>
      <Navbar />
      <PageContainer />
      <Footer />
    </div>
  )
}

export default App
