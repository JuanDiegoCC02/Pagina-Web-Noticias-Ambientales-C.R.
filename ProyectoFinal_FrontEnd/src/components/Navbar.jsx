import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useCookies} from 'react-cookie';

import Imagen from './Imagen';

import "../styles/Navbar.css"


function NavBar() {
  const [cookies, setCookies, removeCookie] = useCookies(['accessToken'],{
        doNotParse: true
    })
     const cerrarSesion = () => {
    localStorage.removeItem('accessToken'); 
    removeCookie('accessToken', { path: '/' });

    localStorage.removeItem('accessToken');
    localStorage.removeItem('grupoUsuario');
    localStorage.removeItem('id');

     window.location.href = "/inicio";  
    
};
            /*en el primer navbar estaba className="bg-body-tertiary">*/
  return (
            
   <Navbar collapseOnSelect expand="lg" className="ContainerNavbar">
  <Container className='MainContainerNavbar'>
    <a href="/">
      <Imagen className="NavbarImg" enlaceImagen={"../src/Images/Logo Pag Noticias.jpg"}/>
    </a>
    
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    
    <Navbar.Collapse id="responsive-navbar-nav">
      {/* BLOQUE 1: Links a la izquierda */}
      <Nav className="me-auto"> 
        {localStorage.getItem('grupoUsuario') === 'Administrador' && (
          <Nav.Link className='linkNavbar' href="/moderador">Moderador</Nav.Link>
        )}
        {localStorage.getItem('grupoUsuario') && (
          <Nav.Link className='linkNavbar' href="/noticias">Publicaciones</Nav.Link>
        )}
        <Nav.Link className='linkNavbar' href="/">Inicio</Nav.Link>
        <Nav.Link className='linkNavbar' href="/contacto">Contacto</Nav.Link>
      </Nav>

      {/* BLOQUE 2: Solo "Mi Cuenta" a la derecha (ms-auto hace la magia) */}
      <Nav className="ms-auto">
        {localStorage.getItem('grupoUsuario') ? (
          <NavDropdown title="👤 Mi Cuenta" id="collapsible-nav-dropdown" className="linkConfg">
            <NavDropdown.Item className='confgbtn' href="/perfil">Perfil</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className='confgbtn' onClick={cerrarSesion}>Cerrar Sesión</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <div className="d-flex"> {/* Para que registro e inicio estén juntos */}
            <Nav.Link className='linkNavbar' href="/registro">Registro</Nav.Link>
            <Nav.Link className='linkNavbar' href="/inicio">Inicio de Sesión</Nav.Link>
          </div>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}
  
export default NavBar;