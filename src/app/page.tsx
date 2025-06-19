import React from 'react'
import Navbar from './Components/Navbar'
import LastRead from './Components/LastRead'
import Footer from './Components/Footer'

export default function page() {
  return (
    <div>
      <Navbar /> 
      <LastRead />
      <Footer />
    </div>
  )
}
