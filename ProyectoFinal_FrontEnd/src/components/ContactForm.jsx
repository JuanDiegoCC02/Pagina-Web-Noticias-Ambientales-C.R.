import React, {useState} from 'react'
import  {postContacto} from '../services/MainLlamados'
import "../styles/Contact.css"

function ContactForm() {
      // Parte del POST
      const [NombreContact, setNombreContact] = useState("")
      const [EmailContact, setEmailContact] = useState("")
      const [TelefonoContact, setTelefonoContact] = useState("")
      const [TextContact, setTextoContact] = useState("")
      const [msjExitoso, setMsjExitoso] = useState("")
      const [mensaje, setMensaje] = useState("")

    // Funciones para actualizar cada campo del formulario
    function nombre_contact(e) {
        setNombreContact(e.target.value)
    }
    function email_contact(e) {
        setEmailContact(e.target.value)
    }
     function telefono_contact(e) {
        setTelefonoContact(e.target.value)
    }
     function contact_text(e) {
        setTextoContact(e.target.value)
    }

    // Función que valida y envía el formulario
    async function registrarContacto() {
        //Para que no se pueda enviar el formulario si hay campos vacios
         if (!NombreContact || !EmailContact || !TelefonoContact || !TextContact) {
            setMensaje("Todos los campos son obligatorios.");
            setMsjExitoso("")
            return;
        }
       // Objeto con los datos del formulario
        const obj = {
            nombre: NombreContact,
            email: EmailContact,
            telefono: TelefonoContact,
            mensaje: TextContact,
        }

    try { // metodo POST para que pueda enviar la informacion que se ingresa al formulario
        const respuestaServer = await postContacto(obj,"api/emails-contacto/"); // Envío de los datos al backend (API)
        setNombreContact("") , setEmailContact(""), setTelefonoContact(""), setTextoContact(""); //Para reiniciar el formulario despues de enviarlo
        setMsjExitoso("¡Formulario enviado con exito!")
        setMensaje("")
        console.log("Contacto registrado:", respuestaServer);
      } catch (error) {
        console.error("Error al registrar:", error);
        setMensaje("No se pudo registrar. Verifica los datos.");
        setMsjExitoso("")
      }
}

  return (  
    <><br />
      <div className='MainContactContainer'> 

    <div className='contactContainer'>
      <h1>Formulario de Contactos</h1> <br />
    <label className='contactLabel' htmlFor="">Nombre</label>
    <input className='contactInput' value={NombreContact} onChange={nombre_contact} type="text" />
      <hr />
    <label className='contactLabel' htmlFor="">Email</label>
    <input className='contactInput' value={EmailContact} onChange={email_contact} type="email" />
      <hr />
    <label className='contactLabel' htmlFor="">Telefono</label>
    <input className='contactInput' value={TelefonoContact} onChange={telefono_contact} type="text" />
      <hr />
       <label className='contactLabel' htmlFor="">Comentario</label>
      <input className='contactMsg' value={TextContact} onChange={contact_text} type="text" placeholder='Mensaje' />
      <br /><br />
      <button className='contactBtn' onClick={registrarContacto}>Enviar</button>
      {mensaje && <p  className='error-message-I' >{mensaje}</p>} 
      {msjExitoso && <p className='good-message'>{msjExitoso}</p>}

    </div>

    <div className='SecondContact'>
      <h1>Información </h1><br />
      <h2>Ubicación</h2>
      <h3 className='ContactH2' >San José, Costa Rica</h3>
      <hr /><br />
      <h2>Teléfono</h2>
      <h3 className='ContactH2' >506-8724-3114</h3>
      <hr /><br />
      <h2>Email</h2>
      <h3 className='ContactH2' >NotiAmbientales@gmail.com</h3>
      <hr /><br />
      <h2>Horario</h2>
      <h3 className='ContactH2' >Lunes a Viernes</h3>
      <h3 className='ContactH2' >9:00 a.m  4:00 pm</h3>
      <hr /><br />
      <h2>Redes Sociales</h2>
      <ul className='contacto'>
            <li className='liRedes'><a className='iconoReds' href="https://www.youtube.com"><i className="fa-brands fa-youtube"></i></a></li>
            <li className='liRedes'><a className='iconoReds' href="https://x.com"><i className="fa-brands fa-x-twitter"></i></a></li>
            <li className='liRedes'><a className='iconoReds' href="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></a></li>
            <li  className='liRedes'><a  className='iconoReds'  href="https://www.facebook.com"><i className="fa-brands fa-facebook-f"></i></a></li>
            </ul>
    </div>

    </div>
    </>
  )
}

export default ContactForm