import React, { useEffect, useState } from 'react'
import { deleteUser, getUsers, patchData } from '../services/MainLlamados'
import MapaCards from './MapaCards'
import Cloudinary from './Cloudinary'
import "../styles/AdminNoticias.css"
import AlertaEliminar from './AlertaEliminar'
import Button from 'react-bootstrap/esm/Button'


function AdminNoticias() {
        const [alertaEliminar, setAlertaEliminar]= useState(false)
        const [idEliminarPublicacion, setIdEliminarPublicacion] = useState(null)

        const [publicaciones, setPublicaciones] = useState([])
        const [reload, setReload] = useState (false) 
    
        const [editTitulo, setEditTitulo] = useState("")
        const [editDescripcion, setEditDescripcion] = useState("")
        const [editLatitud, setEditLatitud] = useState("")
        const [editLongitud, setEditLongitud] = useState("")
        const [editImg, setEditImg] = useState("")
        const [mostrar, setMostrar] = useState(false)
    
        const [usuario,setUsuario] = useState(null) 

        // useEffect se ejecuta al cargar o cuando cambia 'reload'
        useEffect(() => {
        if(usuario){
          console.log("entra al usuario");
          console.log(usuario);
          setEditTitulo(usuario.titulo)
        }
    
        // get news
        async function TraerPublicaciones() {
            const datos = await getUsers("api/publicaciones")
            const ordenados = [...datos].sort((a, b) => b.id - a.id)
            setPublicaciones(ordenados)
        }
        TraerPublicaciones()
        }, [reload])  // Se actualiza si 'reload' cambia

    
   // edit news pacth
async function ActualizarPublicaciones(id) {
    const imagenNueva = localStorage.getItem("img");
    
    const actPublicacion = {
        "titulo": editTitulo,
        "descripcion": editDescripcion,
        "latitud": parseFloat(editLatitud),
        "longitud": parseFloat(editLongitud),
    };

    if (imagenNueva) {
        actPublicacion.img = imagenNueva;
    }

    try {
        await patchData(actPublicacion, "api/publicaciones", id);
        localStorage.removeItem("img");
        
        setReload(!reload); 
        setMostrar(false);  
    } catch (error) {
        console.error("Error detallado del servidor:", error);
        alert("No se logro actualizar la publicación.");
    }
}


        // edit open modal & confirm edit
        function abrirModalPublicaciones(usuario) {
            setUsuario(usuario)
            setEditTitulo(usuario.titulo)
            setEditDescripcion(usuario.descripcion)
            setEditLatitud(usuario.latitud)
            setEditLongitud(usuario.longitud)
            setEditImg(usuario.img)
            setMostrar(true)
            console.log(editTitulo);
        }
    
        // delete
        async function EliminarPublicacion(id) {
            await deleteUser (id, "api/publicaciones")
            setReload(r => !r)
            setAlertaEliminar(false)
        }
        
        // Cambiar estados de publicaciones 
        async function estadoPublicacion(id, estado) {
        const actPublicacion =
             {"estado_publicacion": estado};
    try {
        await patchData(actPublicacion, "api/publicaciones", id); 
        setReload(prev => !prev); 
    } catch (error) {
        console.error("Error al actualizar el estado de la publicación:", error);
    }
}
// logic 3 states
  const estados = ["pendiente", "rechazada", "publicada"];
async function cambiarEstado(id, estadoActual) {
    const nuevoEstado = estados[(estados.indexOf(estadoActual) + 1) % estados.length]; // Para alternar entre estados
    await estadoPublicacion(id, nuevoEstado);
}

  return (


 
    <div className="admin-news">
  <div className="admin-news__wrapper">

    {publicaciones.map((p) => (
      <article key={p.id} className="news-card">

        {/* header admin news */}
        <header className="news-card__header">
          <span className="news-card__type">
            {p.nombre_tipo_publicacion}
          </span>

          <button
            className={`news-card__status news-card__status--${p.estado_publicacion}`}
            onClick={() => cambiarEstado(p.id, p.estado_publicacion)}
          >
            {p.estado_publicacion}
          </button>
        </header>

        {/* body admin news */}
        <div className="news-card__body">
          <h2 className="news-card__title">{p.titulo}</h2>

          <p className="news-card__description">
            {p.descripcion}
          </p>

          <img
            src={p.img}
            alt="Imagen publicación"
            className="news-card__image"
          />

          <div className="news-card__location">
            <h4>Ubicación</h4>
            <div className="news-card__map">
              <MapaCards latitud={p.latitud} longitud={p.longitud} />
            </div>
          </div>
        </div>

        {/* footer admin news */}
        <footer className="news-card__footer">
          <button
            className="btn btn--danger"
            onClick={() => {
              setAlertaEliminar(true)
              setIdEliminarPublicacion(p.id)
            }}
          >
            Eliminar
          </button>

          <button
            className="btn btn--warning"
            onClick={() => abrirModalPublicaciones(p)}
          >
            Editar
          </button>
        </footer>

      </article>
    ))}

  </div>

  {/* modal edit */}
  {mostrar && (
    <div className="modal">
      <div className="modal__content">

        <h3 className="modal__title">Editar Publicación</h3>

        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            value={editTitulo}
            onChange={(e) => setEditTitulo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={editDescripcion}
            onChange={(e) => setEditDescripcion(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Latitud</label>
            <input
              type="text"
              value={editLatitud}
              onChange={(e) => setEditLatitud(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Longitud</label>
            <input
              type="text"
              value={editLongitud}
              onChange={(e) => setEditLongitud(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <Cloudinary />
        </div>

        <div className="modal__actions">
          <button
            className="btn btn--primary"
            onClick={() => ActualizarPublicaciones(usuario.id)}
          >
            Guardar Cambios
          </button>

          <button
            className="btn btn--ghost"
            onClick={() => setMostrar(false)}
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  )}

  {/* Modal eliminar */}
  {alertaEliminar && (
    <div className="modal">
      <AlertaEliminar
        confirmarEliminar={() => EliminarPublicacion(idEliminarPublicacion)}
        denegarEliminar={() => setAlertaEliminar(false)}
      />
    </div>
  )}
</div>



  )
}

export default AdminNoticias