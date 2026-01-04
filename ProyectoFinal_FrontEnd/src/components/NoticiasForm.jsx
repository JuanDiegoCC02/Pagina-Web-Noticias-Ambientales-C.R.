import React, { useState, useEffect } from 'react';
import { postUsers, getUsers } from '../services/MainLlamados';
import Geolocalizacion from '../components/Geolocalizacion';
import Cloudinary from './Cloudinary';
import "../styles/NoticiasForm.css";

function NoticiasForm() {
     // Estados para capturar datos del formulario
    const [TituloNoticia, setTituloNoticia] = useState("");
    const [DescripcionNoticia, setDescripcionNoticia] = useState("");
    const [TipoPublicacion, setTipoPublicacion] = useState([]);
    const [publicacion, setPublicacion] = useState("");
    const [publiCreada, setPubliCreada] = useState ("")
    const [mensaje, setMensaje] = useState("");
    const [errores, setErrores] = useState({}); 

    function TituloF(e) { // Función para actualizar título
        setTituloNoticia(e.target.value);
    }

    function DescripcionF(e) { // Función para actualizar descripción
        setDescripcionNoticia(e.target.value);
    }

    //Envía los datos del formulario al servidor
    async function enviar() { 
    // Recupera datos guardados en el LocalStorage
    const guardaLatitud = JSON.parse(localStorage.getItem("posicion"));
    const guardarUsuario = JSON.parse(localStorage.getItem("id"));
    const guardarURL = localStorage.getItem("img");

    // Validación manual antes de enviar
    const erroresLocales = {};
    if (!TituloNoticia.trim()) erroresLocales.titulo = ["El título es obligatorio"];
    if (!DescripcionNoticia.trim()) erroresLocales.descripcion = ["La descripción es obligatoria"];
    if (!publicacion) erroresLocales.tipopublicacion = ["Debe seleccionar un tipo de publicación"];

     // Si hay errores, se detiene el envío y se muestra mensaje
    if (Object.keys(erroresLocales).length > 0) {
        setErrores(erroresLocales);
        setMensaje("Hay errores en el formulario. Revisa los campos.");
        setPubliCreada("")
        return; 
    }
    // Obj con los datos que se van a enviar 
    const obj = {
        titulo: TituloNoticia,
        descripcion: DescripcionNoticia,
        tipopublicacion: publicacion,
        usuario: guardarUsuario,
        latitud: guardaLatitud?.[0],
        longitud: guardaLatitud?.[1],
        img: guardarURL
    };

    try { // Envio de datos a la API
        const respuestaServer = await postUsers(obj, "api/publicaciones/");
        console.log("Publicación enviada:", respuestaServer);
        // Resetea el formulario y muestra mensaje
        setPubliCreada("Publicación Enviada");
        setMensaje(""); 
        setErrores({});
        setTituloNoticia("");
        setDescripcionNoticia("");
        setPublicacion("");
        
    } catch (error) {
        console.error("Error al crear publicación:", error);

        if (error instanceof Response) {
            const data = await error.json();
            setErrores(data);
            setMensaje("Hay errores en el formulario. Revisa los campos.");
        } else {
            setMensaje("Ocurrió un error inesperado.");
        }
    }
}

    // Para elegir entre Noticias y Campañas que se encuentran en la base de Datos
    useEffect(() => {
        const fetchTiposPublicacion = async () => {
            try {
                const respuesta = await getUsers("api/tipopublicaciones");
                setTipoPublicacion(respuesta);
            } catch (error) {
                console.error("Error al obtener tipos de publicación:", error);
                setMensaje("Error al obtener el tipo de publicación.");
            }
        };

        fetchTiposPublicacion();
    }, []);

    return (
        <>
            <div className='mainContainerNoticia'>
                <h2 className='tituloNoticia'>Ingrese Publicación</h2>
                <div className='containerNoticia'>
                    {/*/Value se muestra en el input, vinculado al estado que tenga dentro de las llaves*/}
                    {/*Onchange actualiza el estado cada vez que cambia el valor del input*/}
                    <input
                        value={TituloNoticia} 
                        className='inputTexto'
                        type="text"
                        onChange={TituloF}
                        placeholder='Titulo Publicación'
                    />
                    {errores.titulo && <p className='error-message-I'>{errores.titulo[0]}</p>}

                    <input
                        value={DescripcionNoticia}
                        className='inputTexto'
                        type="text"
                        onChange={DescripcionF}
                        placeholder='Descripción Publicación'
                    />
                    {errores.descripcion && <p className='error-message-I'>{errores.descripcion[0]}</p>}

                    <select
                        value={publicacion}
                        onChange={(e) => setPublicacion(e.target.value)}
                        className='selectNoticias'
                    >
                        <option value="" disabled>Tipo de Publicación</option>
                        {TipoPublicacion.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                        ))}
                    </select>
                    {errores.tipopublicacion && <p className='error-message-I'>{errores.tipopublicacion[0]}</p>}

                    <Geolocalizacion />
                    <Cloudinary />

                    <button onClick={enviar} className='noticiasBtn'>Enviar</button>

                    {mensaje && <p className='error-message-I'>{mensaje}</p>}

                    {publiCreada && <p className='creacion-message-I'>{publiCreada}</p>}
                </div>
            </div>
        </>
    );
}

export default NoticiasForm;
