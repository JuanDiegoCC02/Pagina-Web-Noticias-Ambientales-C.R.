import React, {useState} from 'react'
import  {PostUsuarios} from '../services/llamados_usuarios'
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Register.css"
import InfoTCmodal from './InfoTCModal';

function RegistroForm() {
    // Estados para los inputs
    const [NombreUser, setNombreUser] = useState("")
    const [NmUsuario, setNmUsuario] = useState("")
    const [ApUsuario, setApUsuario] = useState("")
    const [ContraseñaUsuario, setContraseñaUsuario] = useState("")
    const [EmailUsuario, setEmailUsuario] = useState("")
    const [Fecha_NacimientoUsuario, setFecha_NacimientoUsuario] = useState("")
    const [TelefonoUsuario, setTelefonoUsuario] = useState("")
    //Checkbox TC
    const [TermCondCheckbox, setTermCondCheckbox] = useState(false)
    const [mostrarInfoTC, setMostrarInfoTC] = useState(false);
    // Función para cerrar el modal de Terminos y condenación 
    const eliminarMensaje = () => {
    setMostrarInfoTC(false);
    };
    const [errorTerminos, setErrorTerminos] = useState("");


     const [mensaje, setMensaje] = useState("") // Para mostrar mensaje
     const navigate = useNavigate();

    // Handlers de input para guardar el estado cuando el valor cambie
    function nombre_user(e) {
        setNombreUser(e.target.value)
    }
    function nombre(e) {
        setNmUsuario(e.target.value)
    }
    function apellido(e) {
        setApUsuario(e.target.value)
    }
     function contraseña(e) {
        setContraseñaUsuario(e.target.value)
    }
     function email(e) {
        setEmailUsuario(e.target.value)
    } 
    function fecha_nacimiento(e) {
        setFecha_NacimientoUsuario(e.target.value)
    }
    function telefono(e) {
        setTelefonoUsuario(e.target.value)
    }
    // Para manejar el Checkbox
    function cambioTermsConds(e) {
        const checked = e.target.checked
        setTermCondCheckbox(checked)
       if (!checked) { // Si no está marcado, da error
        setErrorTerminos("Debe aceptar los Términos y Condiciones para continuar.");
    } else {
        setErrorTerminos("");
        setMostrarInfoTC(true);
    }
}

    
    async function registrar() {
        // Para limpiar los textos
        setMensaje(""); 
        setErrorTerminos(""); 

        // Validación para que todos los espacios deban completarse antes de poder enviar el formulario
         if (!NombreUser || !NmUsuario || !ApUsuario || !ContraseñaUsuario || !EmailUsuario || !Fecha_NacimientoUsuario || !TelefonoUsuario) {
            setMensaje("Debe completar todos los campos!");
            return;
        }

        // Validacion para terminos y condiciones
         if (!TermCondCheckbox){
            setErrorTerminos("Debe aceptar los Términos y Condiciones para continuar.")
            setMostrarInfoTC(false)
            return;
        }
    
        const obj = {
            username: NombreUser,
            first_name: NmUsuario,
            last_name: ApUsuario,
            password: ContraseñaUsuario,
            email: EmailUsuario,
            fecha_nacimiento: Fecha_NacimientoUsuario,
            telefono: TelefonoUsuario
        }
    try { // POST para crear el usuario
        const respuestaServer = await PostUsuarios(obj);
        console.log("Usuario registrado:", respuestaServer);
        navigate("/inicio");
    } catch (error) {
    console.error("Error al registrar:", error);

    // Verifica si viene un msj
    if (error.response && error.response.data) {
        const data = error.response.data;

        if (data.error) {
            setMensaje(data.error); // mensaje backend
        } else {
            setMensaje("No se pudo registrar. Verifica los datos.");
        }
        } else {
            setMensaje("Error del servidor. Inténtalo más tarde.");
        }
    }
} 

  return (
    <div>
     <div className='ImgInicioLogo'>
        <a href="/">
         <img  src="../src/Images/Logo Pag Noticias.jpg" alt="" />
         </a>
     </div><br /><br />

        <h3 className='tituloRegistro' >Registro</h3>
        <div className='registerContainer'>
            <div>
            <label className='labelRegister' htmlFor="">Usuario </label><br />
            <input className='inputRegister' value={NombreUser} onChange={nombre_user} type="text" placeholder='Nombre Usuario' />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Nombre </label><br />
            <input className='inputRegister' value={NmUsuario} onChange={nombre} type="text" placeholder='Nombre'/>
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Apellido </label><br />
             <input className='inputRegister' value={ApUsuario} onChange={apellido} type="text" placeholder='Apellido' />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Contraseña </label><br />
            <input className='inputRegister' value={ContraseñaUsuario} onChange={contraseña} type="password" placeholder='Contraseña' />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Email </label><br />
            <input className='inputRegister' value={EmailUsuario} onChange={email} type="email" placeholder='Email' />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Fecha de Nacimiento </label><br />
            <input className='inputRegister' value={Fecha_NacimientoUsuario} onChange={fecha_nacimiento} type="date" />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Telefono</label><br />
            <input className='inputRegister' value={TelefonoUsuario} onChange={telefono} type="text" placeholder='Telefono' />
            </div><hr />
            <div> 
            <label className='labelRegister' htmlFor=""><a className='linkTermCond' href="/termcond" target="_blank" rel="noopener noreferrer"> Terminos y Condiciones </a></label>
            <input type="checkbox" name="checkbox" id="checkbox" onChange={cambioTermsConds} /> 
            </div>
              <div>
             <>
               {mostrarInfoTC && (
               <>
                <button className='BtnInfoModal' onClick={eliminarMensaje}>X</button>
                <InfoTCmodal InfoTC={"Esta de Acuerdo con los terminos y condiciones de nuestro Registro y politicas para el uso correcto de Nuestra Pagina."} />
              </>
                )}
                </>  
             </div><br />
            <hr />
            <div>
                <input className="registerBtn" type="button" onClick={registrar} value="Registro" /><br /><br />
                 {mensaje && <p className='error-message'>{mensaje}</p>} 

                 {errorTerminos && <p className="error-message">{errorTerminos}</p>}
            
            </div><br />

        <p>¿Ya tienes cuenta? <br /> <Link className='linkRegistro' to="/inicio">Inicia Sesión</Link>   </p>
        </div>
    </div>
  )
}

export default RegistroForm