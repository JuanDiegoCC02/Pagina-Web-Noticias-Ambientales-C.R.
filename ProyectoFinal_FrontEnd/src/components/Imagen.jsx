import React from 'react'
import "../styles/Navbar.css"

// Esta Función es para poder ingresar una imagen al NavBar ya que con Bootstrap
// se dificulta el poder ingresarla y darle estilos 
function  Imagen({enlaceImagen}) {
  return (
    <img className='NavbarImg' src={enlaceImagen}  />
  )
}

export default Imagen