import React from 'react'
import NavBar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import AdminNoticias from '../components/AdminNoticias'

function NoticiasAdmin() {
  return (
    <div>
    <nav><NavBar /></nav>
    
    <main>
    <Sidebar />
    <AdminNoticias />
    </main>

    <footer><Footer /></footer>

    </div>
  )
}

export default NoticiasAdmin