import React from 'react'
import LandingPage from './components/LandingPage'
import Contact from './components/Contact'
import Book from './components/Book'
import { Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <div>
    
    
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
   
    </div>
    
  )
}

export default App
