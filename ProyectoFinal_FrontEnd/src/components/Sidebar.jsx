import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import "../styles/Sidebar.css"

// Opción para configurar el comportamiento de scroll y fondo del Offcanvas
const options = [
  {
    name: 'Enable both scrolling & backdrop',
    scroll: true,
    backdrop: true,
  },
];

function Sidebar({ name, ...props }) {
  const [show, setShow] = useState(false); // Estado para controlar si el Offcanvas está visible o no
  const handleClose = () => setShow(false); // Función que cierra el Sidebar
  const toggleShow = () => setShow((s) => !s); // Función que alterna entre mostrar/ocultar el Sidebar

  return (
   
    <div className='allSideBar'>
     <>
      <Button variant="primary" onClick={toggleShow} className="me-2"> {name}Admin</Button>
      <Offcanvas style={{backgroundColor:"#e6e6e6e6"}} show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Noticias Ambientales CR</Offcanvas.Title>
        </Offcanvas.Header>
        <Nav style={{backgroundColor:"#ECFAE5"}} className="navPadre">
            <Nav.Link className='navHijo' href="/moderador">Admin Graficos</Nav.Link>
            <Nav.Link className='navHijo'  href="/tablausuarios">Tabla Usuarios</Nav.Link>
            <Nav.Link className='navHijo'  href="/admin">Tabla Publicaciones</Nav.Link>
            <Nav.Link className='navHijo'  href="/tablacomentarios">Tabla Contactos</Nav.Link>
            <Nav.Link className='navHijo' href="/noticias">FormPublicaciones</Nav.Link>
            <Nav.Link className='navHijo' href="/contacto">Contacto</Nav.Link>
          
        </Nav>
        <Offcanvas.Body>
          Aquí se va a poder acceder a un GET de Usuarios, solicitudes contactos, y los distintos tipos de publicaciones.
          Cada uno con su sistema CRUD con un Get, Post, Patch y Delete. Ademas de contar con distintos graficos para llevar de forma más ordenada y limpia la administración de los usuarios y publicaciones.  
        </Offcanvas.Body>
      </Offcanvas>
       </>
      </div>
   
  );
}
export default Sidebar
