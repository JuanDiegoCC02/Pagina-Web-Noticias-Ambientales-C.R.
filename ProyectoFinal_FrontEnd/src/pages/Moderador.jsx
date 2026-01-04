import React from 'react'
import Navbar from '../components/Navbar'
import StripedColumnsExample from '../components/TablaUsuariosCom'
import Footer from '../components/Footer'
import "../styles/Moderador.css"
import Sidebar from '../components/Sidebar'
import LineBar from '../components/LineBar'
import LineBarUsers from '../components/LineBarUsers'


function Moderador() {
  return (
    <div>

    <nav>
    <Navbar/>
    </nav>

    <main className='cont-tablita'>
    <Sidebar />
    <StripedColumnsExample/>
    <LineBar/>
    <LineBarUsers/>
    </main>

    <footer>
    <Footer />
    </footer>

    </div>
  )
}

export default Moderador