  import React, { useEffect, useState } from 'react'
  import { getUsers, deleteUser, postUsers, patchData } from '../services/MainLlamados'
  import "../styles/NoticiaFull.css"
  
  import MapaCards from './MapaCards'
  import CalificacionStarReact from './CalificacionStarReact'

  import AlertaEliminar from './AlertaEliminar'
  import AlertaEliminarRespuesta from './AlertaEliminarRespuesta'
  import Button from 'react-bootstrap/esm/Button'


  function NoticiaFull() {
    const [reload, setReload] = useState(false) 
    const [alertaEliminar,setAlertaEliminar] = useState(false)
    const [alertaEliminarRespuesta, setAlertaEliminarRespuesta] = useState(false);

    const [publicaciones, setPublicaciones] = useState([])
    const [comentarios, setComentarios] = useState([]) 
    const [cantReportes,setCantReportes] = useState([])

    const [respuestas, setRespuestas] = useState({})
    const [textoRespuesta, setTextoRespuesta] = useState({}) 
    const [errores, setErrores] = useState({})
    const [erroresRespuestas, setErroresRespuestas] = useState({})

    const [comentariosPublicaciones, setComentariosPublicaciones] = useState("")
    const [editComentario, setEditComentario] = useState("")
    const [editRespuesta, setEditRespuesta] = useState("")
    
    const [comentarioActivo, setComentarioActivo] = useState(null)
    const [comentarioEditandoId, setComentarioEditandoId] = useState(null);
  
    const [respuestaEditando, setRespuestaEditando] = useState(null);
    const [comentarioEditando, setComentarioEditando] = useState(null); 
    const [respuestaAEliminar, setRespuestaAEliminar] = useState(null);
    const [comentarioAsociado, setComentarioAsociado] = useState(null);
    const [idEliminarComentario,setIdEliminarComentario] = useState(null);
   
    const [reportes, setReportes] = useState(0)
   
    const [usuario, setUsuario] = useState(null) 
    const [mensaje, setMensaje] = useState("");
   
    
   
  

    // Post para agregar comentarios a la publicacion 
    async function AggComentario() {
      const erroresLocales = {}; // Validación manual antes de enviar
      if (!comentariosPublicaciones.trim()) erroresLocales.contenido = ["El contenido en el comentario es obligatorio"];
      if (Object.keys(erroresLocales).length > 0) {
          setErrores(erroresLocales);
          setMensaje("Hay errores en el formulario. Revisa los campos.");
          return;
      }

      const comentarioPublicacion = {
        "contenido": comentariosPublicaciones,
        "publicacion": localStorage.getItem("id_publicacion"),
        "usuario": localStorage.getItem("id")
      }

      try {
      await postUsers(comentarioPublicacion, "api/comentarios/")
      setComentariosPublicaciones("")
      setReload((r) => !r)
      setErrores({});
    }
    catch (error) {
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
   
  //Post para añadir respuesta por medio del id del comentario
    async function AgregarRespuesta(comentarioId) {
      console.log("Comentario ID:", comentarioId);
    if (!textoRespuesta[comentarioId] || !textoRespuesta[comentarioId].trim()) {
      setErroresRespuestas(prev => ({
        ...prev,
        [comentarioId]: "El contenido en la respuesta es obligatorio"
      }));
      setErrores({}); // Limpia errores de comentario
      return;
    }

      const respuesta = {
        "contenido": textoRespuesta[comentarioId],
        "comentario": comentarioId,
        "usuario": localStorage.getItem("id"),
        "publicacion": localStorage.getItem("id_publicacion")
      }
      try {
      await postUsers(respuesta, "api/respuestascomentarios/");
      setTextoRespuesta(prev => ({ ...prev, [comentarioId]: "" }));
      setErroresRespuestas(prev => ({ ...prev, [comentarioId]: "" })); // limpiar error de ese comentario
      await TraerRespuestas(comentarioId);
      setReload(r => !r);
    } catch (error) {
      console.error("Error al crear respuesta:", error);
      setErroresRespuestas(prev => ({
        ...prev,
        [comentarioId]: "Ocurrió un error al enviar la respuesta."
      }));
    }
  }

    // GET para traer las respuestas que se hacen a un comentario especifico de la publicacion 
    async function TraerRespuestas(comentarioId) {
      console.log("Traer respuestas para comentario ID:", comentarioId);
      const datos = await getUsers("api/respuestascomentarios")
      const filtradas = datos.filter(r => r.comentario === comentarioId)
      setRespuestas(prev => ({ ...prev, [comentarioId]: filtradas }))
    }

    // useEffect para cargar publicaciones, comentarios y reportes
    useEffect(() => {
      // Get para traer las publicaciones del formulario
      async function TraerPublicaciones() {
        const datos = await getUsers("api/publicaciones", localStorage.getItem("id_publicacion") + "/")
        setPublicaciones(Array.isArray(datos) ? datos : datos ? [datos] : [])
      }
      // Get para traer los comentarios de la publicacion 
      async function TraerComentarios() { 
        const datos = await getUsers("api/comentarios")
        const filtro = datos.filter((dato) => dato.publicacion === parseInt(localStorage.getItem("id_publicacion")))
        setComentarios(Array.isArray(filtro) ? filtro : filtro ? [filtro] : [])
        console.log(datos);
        console.log(datos[0].usuario);
      }
      // GET REPORTES
      async function traerReportes() {
        try {
          const datos = await getUsers("api/publicaciones");
          console.log(datos);
          const filtro = datos.filter((dato) => dato.id == localStorage.getItem("id_publicacion"));
          console.log(filtro);
          setReportes(filtro);
          setCantReportes(filtro[0].reporte)
        } catch (error) {
          console.error("Error al traer reportes:", error);
        }
      }
      traerReportes()
      TraerPublicaciones()
      TraerComentarios()

    }, [reload])

    //Eliminar Comentarios
    async function EliminarComentario(id) {
      await deleteUser(id, "api/comentarios")
      setReload(r => !r)
      setAlertaEliminar(false)
    }

    //Editar Comentario
    async function actualizarComentarios(id) {
      const actComentario = {
        "contenido": editComentario
      }
      await patchData(actComentario, "api/comentarios", id)
      setReload(!reload)
      setComentarioEditandoId(null); // para cerrar el input después de guardar
    } 
    // Modal para abrir el editar de comentarios
    function abrirModal(comentario) {
    setComentarioEditandoId(comentario.id);
    setEditComentario(comentario.contenido);
    setErrores({}); // Limpia errores al abrir modal
  }

    // Eliminar Respuesta Comentario 
    async function eliminarRespuesta(respuestaId, comentarioId) {
      await deleteUser(respuestaId, "api/respuestascomentarios");
      await TraerRespuestas(comentarioId); // Actualiza solo las respuestas de ese comentario
      setAlertaEliminarRespuesta(false)
    }

    // Editar Respuestas comentarios
    async function actualizarRespuestas(id) {
      const actRespuesta = {
        "contenido": editRespuesta
      }
      await patchData(actRespuesta, "api/respuestascomentarios", id);
      // Actualiza solo las respuestas del comentario correspondiente
      if (comentarioEditando) {
        await TraerRespuestas(comentarioEditando);
      }
      setRespuestaEditando(null);
      setComentarioEditando(null);
    } // Modal para abrir el editar de respuestas
    function abrirModalRespuestas(respuesta, comentarioId) {
      setUsuario(respuesta);
      setEditRespuesta(respuesta.contenido);
      setRespuestaEditando(respuesta.id);
      setComentarioEditando(comentarioId);
    }
    // REPORTES PATCH
    async function AggReporte() {
      console.log(reportes[0].reporte++);
      const reportePublicacion = {
        "reporte": reportes[0].reporte+=1-1, // Se hizo el +=1-1 debido a que con +1 se agregan de 2 en 2 reportes
        "publicacion": localStorage.getItem("id_publicacion"),
        "usuario": localStorage.getItem("id")
      }
      const act = await patchData(reportePublicacion, "api/publicaciones",localStorage.getItem("id_publicacion"))
      console.log(reportePublicacion);
      console.log(act);
      // All llegar a 20 reportes 
      // el estado de la publicacion cambie a pendiente
      if (reportes[0].reporte >= 20) {
        console.log("llegó");
        const cambiarEstado = await patchData({"estado_publicacion":"pendiente"},"api/publicaciones",localStorage.getItem("id_publicacion"))
        console.log(cambiarEstado);
      }
      setReload(prev => !prev)
    }
    
    return (
      <div className='noticiasContainer'>
        <div className='noticiasCard'>
          <div className='noticiasCardContent'>
            {Array.isArray(publicaciones) && publicaciones.map((p) => ( // Card que trae y contiene las publicaciones
              <div key={p.id} className='noticiasItem'>
                <p className='tipoPublicacion'>{p.nombre_tipo_publicacion}</p>
                <h1 className='tituloPublicacion'>{p.titulo}</h1>
                <h2 className='descripPublicacion'>{p.descripcion}</h2>
                <img src={p.img} alt="Imagen de la noticia" className='noticiasIMG' width={300} />
                <label htmlFor="" className='ubicacionLb'>Ubicación</label>
                <div className='containerGeolocalizacion'>
                 <MapaCards latitud={p.latitud} longitud={p.longitud} />
                </div>
             
                <div>
                <React.StrictMode>
                  <CalificacionStarReact />
                </React.StrictMode>
                </div><br />
                
                <h2 className='tituloReporteNoticia'>Haz Click para reportar la Noticia</h2>
                <button onClick={AggReporte} className='btnReportes'>Reportar</button>
                <p className='countReportes'>Número de Reportes: {cantReportes}</p>
                
                <h2 className='tituloComentarios'>Comentarios</h2>
                <div>
                  <input className='inputComentarioNoticia' type="text" value={comentariosPublicaciones}
                    onChange={(e) => setComentariosPublicaciones(e.target.value)} placeholder='Agregar comentario' />
                      {errores.contenido && <p className='error-message-I'>{errores.contenido[0]}</p>}
                  <br />
                  <button className='btnComentarioNoticiasFull' onClick={AggComentario}>Enviar Comentario</button>
                </div>

                <div className="comentariosContainer">
                  {comentarios.map((comentario) => (
                    <div key={comentario.id} className="comentarioCard">
                      <div className="comentarioUsuario">{`Usuario #${comentario.usuario}`}</div>
                      <div className="comentarioContenido">{comentario.contenido}</div>

                      {/*Para que el boton de Eliminar solo se muestre al usuario que realizó el comentario*/}
                      {localStorage.getItem("id") == comentario.usuario && (
                        <Button href='#eliminacion' className='noticiasFullBtnEliminar' onClick={() =>{
                          setAlertaEliminar(true)
                          setIdEliminarComentario(comentario.id)
                        }}>Eliminar</Button>
                      )}
                      
                      {/*Para que el boton de editar solo se muestre al usuario que realizó el comentario*/}
                      {localStorage.getItem("id") == comentario.usuario && (
                        <button className='noticiasFullBtnEdit' onClick={() => abrirModal(comentario)}>Editar</button>
                      )}
                      {comentarioEditandoId === comentario.id && (
                        <>
                          {/* Input para editar el comentario */} 
                          <input
                            className='noticiasInputComentariosBtn'
                            type="text"
                            value={editComentario} // Valor actual del comentario en edición
                            onChange={(e) => setEditComentario(e.target.value)} // Actualiza el estado conforme escribes
                          />
                          {/* Botón para guardar el comentario editado */}
                          <button
                            className='noticiasFullGuardarComentariosBtn'
                            onClick={() => actualizarComentarios(comentario.id)} // Llama a la función que actualiza el comentario en backend
                          >Guardar</button>
                          <button className='noticiasFullBtnCancelarEdit' onClick={() => setComentarioEditandoId()}>Cancelar</button>
                        </>
                      )}
                      <button
                        className='noticiasFullBtnRespuesta'
                        onClick={() => {
                          if (comentarioActivo === comentario.id) {
                            setComentarioActivo(null)
                          } else {
                            setComentarioActivo(comentario.id)
                            TraerRespuestas(comentario.id)
                          }
                        }}
                      >
                        Ver respuestas
                      </button>
                      {comentarioActivo === comentario.id && (
                        <div className="respuestasContainer">
                          <div>
                            <h6 className='tituloRespuesta'>Respuestas</h6>
                            {respuestas[comentario.id] && respuestas[comentario.id].length > 0 ? (
                              respuestas[comentario.id].map(respuesta => (
                                <div key={respuesta.id} className="respuestaCard">
                                  {respuestaEditando === respuesta.id ? (
                                    <>
                                      <input
                                        className='inputRespuestaEditNoticias'
                                        type="text"
                                        value={editRespuesta}
                                        onChange={(e) => setEditRespuesta(e.target.value)}
                                      />
                                      <button
                                        className='btnRespuestaConfirmarEdit'
                                        onClick={() => actualizarRespuestas(respuesta.id)}
                                      >
                                        Guardar
                                      </button>
                                      <button
                                        className='btnRespuestaCancelarEdit'
                                        onClick={() => setRespuestaEditando(null)}
                                      >
                                        Cancelar
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      {respuesta.contenido}
                                      <br />
                                      {/*Para solo mostrar el boton de eliminar en sus propios comentarios al usuario*/}
                                      {localStorage.getItem("id") == respuesta.usuario && (
                                        <>
                                          <button
                                            className='btnRespuestaEliminar'
                                            onClick={() => {
                                              setAlertaEliminarRespuesta(true);
                                              setRespuestaAEliminar(respuesta.id);
                                              setComentarioAsociado(comentario.id);
                                            }}
                                          >
                                            Eliminar
                                          </button>
                                          <button
                                            className='btnRespuestaEditar'
                                            onClick={() => abrirModalRespuestas(respuesta, comentario.id)}
                                          >
                                            Editar
                                          </button>
                                        </>
                                      )}
                                    </>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div>No hay respuestas.</div>
                            )}
                          </div>
                          <input className='inputRespuestaNoticias'
                            type="text"
                            placeholder='Responder Comentario'
                            value={textoRespuesta[comentario.id] || ""}
                            onChange={e => setTextoRespuesta(prev => ({ ...prev, [comentario.id]: e.target.value }))}
                          />
                          {erroresRespuestas[comentario.id] && <p className='error-message-I'>{erroresRespuestas[comentario.id]}</p>}

                          <button className='btnRespuestaNoticias' onClick={() => AgregarRespuesta(comentario.id)}>Enviar Respuesta</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        {alertaEliminar &&
        <div className='alertaEliminarCont' id='eliminacion'>
          <AlertaEliminar confirmarEliminar={()=>EliminarComentario(idEliminarComentario)}
          denegarEliminar={()=>setAlertaEliminar(false)}
          />
          </div>
                        }
          {alertaEliminarRespuesta && (
          <div className="alertaEliminarCont" id="eliminacion-respuesta">
            <AlertaEliminarRespuesta confirmarEliminar={() => {
                eliminarRespuesta(respuestaAEliminar, comentarioAsociado);
                setAlertaEliminarRespuesta(false);
              }}
              denegarEliminar={() => setAlertaEliminarRespuesta(false)}
            />
          </div>

        )}
          </div>
      </div>
    )
  }

  export default NoticiaFull
