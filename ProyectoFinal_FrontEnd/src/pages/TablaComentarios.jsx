import React from 'react'
import TablaComentariosCom from '../components/TablaComentariosCom'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

function TablaComentarios() {
  return (
    <div>

    <NavBar />
    <Sidebar />
    <TablaComentariosCom />
    <Footer />

    </div>
  )
}

export default TablaComentarios