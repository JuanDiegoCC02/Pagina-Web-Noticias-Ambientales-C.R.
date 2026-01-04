import React from 'react'
import "../styles/Footer.css"


function Footer() {
  return (
    <>
      <footer className='FooterFo'>
        <div className='FooterContainer'>
        <div className='sec-AboutUs'>
          <h2>Sobre Nosotros</h2>
          <p>Somos una Pagina ambiental creada para ayudar a la sociedad costarricense.</p>
            <ul className='sci'>
            <li><a href="https://www.youtube.com"><i className="fa-brands fa-youtube"></i></a></li>
            <li><a href="https://x.com"><i className="fa-brands fa-x-twitter"></i></a></li>
            <li><a href="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></a></li>
            <li><a href="https://www.facebook.com"><i className="fa-brands fa-facebook-f"></i></a></li>
            </ul>
        </div>

        <div className='sec-QuickLinks'>
          <h2>Soporte</h2>
          <ul>
          <li><a href="/termcond">Privacidad</a></li>
          <li><a href="/termcond">Politicas</a></li>
          <li><a href="/contacto">Ayuda</a></li>
          <li><a href=""></a></li>
            </ul>
        </div>

        <div className='sec-QuickLinks'>
          <h2>Información</h2>
          <ul>
          <li><a href="/">Noticias</a></li>
          <li><a href="/  ">Campañas/Voluntariados</a></li>
            </ul>
        </div>

        <div className='sec-Contact'>
          <h2>Contactenos</h2>
          <ul className='info'>
            <li>
              <span><i className="fa-solid fa-phone"></i></span><p><a href="">+506 8493-3030</a></p>
            </li>
            <li>
              <span><i className="fa-solid fa-envelope"></i></span><p><a href="https://workspace.google.com/intl/es-419/gmail/">NoticiasCR@gmail.com</a></p>
            </li>
          </ul>
        </div>
        </div>
      </footer>
      <div className='copyrightText'>
        <p>Copyright &copy;2025. Derechos Reservados Noticias Ambientales</p>
      </div>

    </>
  )
}

export default Footer