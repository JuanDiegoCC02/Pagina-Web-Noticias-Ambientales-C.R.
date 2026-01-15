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

    // GET de publicaciones
        const [publicaciones, setPublicaciones] = useState([])
        const [reload, setReload] = useState (false) // Estado para forzar recarga tras editar o eliminar
    
    // EDIT de publicaciones
        const [editTitulo, setEditTitulo] = useState("")
        const [editDescripcion, setEditDescripcion] = useState("")
        const [editLatitud, setEditLatitud] = useState("")
        const [editLongitud, setEditLongitud] = useState("")
        const [editImg, setEditImg] = useState("")
        const [mostrar, setMostrar] = useState(false)
    
        const [usuario,setUsuario] = useState(null) // Usuario seleccionado para editar

        // useEffect se ejecuta al cargar o cuando cambia 'reload'
        useEffect(() => {
          // Si hay un usuario seleccionado, se precarga el título
        if(usuario){
          console.log("entra al usuario");
          console.log(usuario);
          setEditTitulo(usuario.titulo)
        }
    
        // Funcion GET para traer las publicaciones
        async function TraerPublicaciones() {
            const datos = await getUsers("api/publicaciones")
            setPublicaciones(datos)
        }
        TraerPublicaciones()
        }, [reload])  // Se actualiza si 'reload' cambia

    
   // Funcion PATCH para poder editar la información de las publicaciones
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


        // Funcion para que al dar click al btn de editar se abra el modal con un input precargado con datos
        // y btn para poder agregar y confirmar la nueva informacion
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
    
        // Funcion DELETE para poder eliminar publicaciones 
        async function EliminarPublicacion(id) {
            await deleteUser (id, "api/publicaciones")
            setReload(r => !r)
            setAlertaEliminar(false)
        }
        
        // Cambiar los estados de las publicaciones (pendiente, rechazada, publicada)
        async function estadoPublicacion(id, estado) {
        const actPublicacion =
             {"estado_publicacion": estado};
    try {
        await patchData(actPublicacion, "api/publicaciones", id); 
        setReload(prev => !prev); // Recargar datos solo si la actualización fue exitosa
    } catch (error) {
        console.error("Error al actualizar el estado de la publicación:", error);
    }
}
// Lógica para rotar entre los tres estados posibles
  const estados = ["pendiente", "rechazada", "publicada"];
async function cambiarEstado(id, estadoActual) {
    const nuevoEstado = estados[(estados.indexOf(estadoActual) + 1) % estados.length]; // Para alternar entre estados
    await estadoPublicacion(id, nuevoEstado);
}

  return (


 <div className='noticiasContainer'>
  <div className='noticiasCard'>
    <div className='noticiasCardContent'>
        
      {publicaciones.map((p) => (
        <div key={p.id} className='noticiasItem'>
          
          <p className='tipoPublicacion'>{p.nombre_tipo_publicacion}</p>
          <img src={p.img} alt="Imagen de la noticia" className='noticiasIMG' width={300} />
          <h1 className='tituloPublicacion'>{p.titulo}</h1> 
          <h2 className='descripPublicacion'> {p.descripcion}</h2>
          <div className='containerGeolocalizacion'>
          <MapaCards latitud={p.latitud} longitud={p.longitud} />
          </div><br />
           <div >
          <button className={`btn-estado ${p.estado_publicacion}`} 
            onClick={() => cambiarEstado(p.id, p.estado_publicacion)}>
            {p.estado_publicacion}
          </button>
          </div>
          <hr />
          
           <Button href='#eliminacion' className='eliminarBtn'
           onClick={() =>{
            setAlertaEliminar(true)
            setIdEliminarPublicacion(p.id)
           }}>Eliminar</Button>

          <button onClick={() => abrirModalPublicaciones(p)} className='editarBtn'>Editar</button>
          
         
         
          
          {mostrar &&
          <><br />  
          {/*/Value se muestra en el input, vinculado al estado que tenga dentro de las llaves*/}
          {/*Onchange actualiza el estado cada vez que cambia el valor del input*/}
          <input type="text" value={editTitulo} onChange={(e) => setEditTitulo(e.target.value)} placeholder='Editar Titulo' />
          <input type="text" value={editDescripcion} onChange={(e) => setEditDescripcion(e.target.value)} placeholder='Editar Descripcion' />
          <input type="text" value={editLatitud} onChange={(e) => setEditLatitud(e.target.value)} placeholder='Editar Latitud' />
          <input type="text" value={editLongitud} onChange={(e) => setEditLongitud(e.target.value)} placeholder='Editar Longitud' />
          <Cloudinary/>
            <br />
          <button className='btnSaveEdit' onClick={() => ActualizarPublicaciones(usuario.id)}>Guardar</button>
          </>
          } <hr /><br />

        </div>
      ))}
    </div>
    
     {alertaEliminar &&
        <div className='alertaEliminarCont' id='eliminacion'>
          <AlertaEliminar confirmarEliminar={()=>EliminarPublicacion(idEliminarPublicacion)}
          denegarEliminar={()=>setAlertaEliminar(false)}
          />
          </div>
                        }

  </div>
</div>

  )
}

export default AdminNoticias