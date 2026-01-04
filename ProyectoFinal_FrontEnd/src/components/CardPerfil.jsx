import React, { useEffect, useState } from 'react';
import { GetUsuarios, UpdateUsuarios } from '../services/llamados_usuarios';
import { getUsers } from '../services/MainLlamados';    //LLamado de para publicaciones

import "../styles/CardPerfil.css"
import CloudinaryPerfil from './CloudinaryPerfil';
import { useNavigate } from 'react-router-dom';



function CardPefil() {
  const [usuarios, setUsuarios] = useState (null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [reload, setReload] = useState(false);

  const [mostrar, setMostrar] = useState(null); 
  const [edicionAliasUsuario, setEdicionAliasUsuario] = useState('');
  const [edicionNombre, setEdicionNombre] = useState('');
  const [edicionEmail, setEdicionEmail] = useState('');
  const [editImg, setEditImg] = useState('');
  const navigate = useNavigate();
  const [mostrarRedireccion,setMostrarRedireccion] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null);

 
  const idLogueado = Number(localStorage.getItem('id'));

  
  const linkCalificacion = (publicacion) => {
  if (publicacion) {
    console.log(publicacion);
    localStorage.setItem("id_publicacion",publicacion)
    navigate("/noticiafull")
    // navigate(`/noticiafull/${publicacion}`);
  }
};



  useEffect(() => {
    //Funcion usuario
    async function traerUsuario() {
      if (!idLogueado) return;
      const data_users = await GetUsuarios(`api/usuariosGet/${idLogueado}`);
      const info_Usuario = data_users.filter(user => user.id === idLogueado);
      setUsuarios(info_Usuario);
      console.log("Usuario", info_Usuario);
    }

    //Funcion publicaciones
     async function traerPublicaciones() {
    const data_publicaciones = await getUsers('api/publicaciones');
    const publicacionesUsuario = data_publicaciones.filter(publicacion => publicacion.usuario === idLogueado);
    setPublicaciones(publicacionesUsuario);
    console.log("publicaciones", publicacionesUsuario)
  }

async function traerCalificaciones() {
  const data_calificaciones = await getUsers(`api/calificacion_usuario/${idLogueado}`);
  const calificacionesUsuario = data_calificaciones.filter(calificacion => Number(calificacion.usuario) === idLogueado);
  setCalificaciones(calificacionesUsuario);
  console.log("calificaiones", calificacionesUsuario)
}

  traerCalificaciones();
  traerPublicaciones();
  traerUsuario();
  }, [reload]);


  // Función de actualizar
  async function actualizar(id) {

    const usuarioActualizado = {
      username: edicionAliasUsuario,
      first_name: edicionNombre,
      email: edicionEmail,
      foto_perfil: localStorage.getItem("img"),
    };
    await UpdateUsuarios(usuarioActualizado, id);
    localStorage.removeItem('img');
    setReload(!reload);
    setMostrar(null); 
  }


  return (

    <div>

      
     <ul className="liPerfil">
  {usuarios && usuarios.map(user => (
      <li key={user.id} className="PerfilItem">

                   {/*------Foto del Perfil-------*/}
            <div>
              <strong>Foto de Perfil</strong><br />
              <img src={user.foto_perfil} alt="Perfil" className="perfilIMG" width={150} /><br />
            </div>

            <div className='containerData'><strong>Usuario</strong> <br /> {user.username}</div>
            <div className='containerData'><strong>Nombre</strong> <br /> {user.first_name}</div>
            <div className='containerData'><strong>Email</strong> <br /> {user.email}</div>
            <div className='containerData'><strong>Cantidad de Publicaciones</strong> <br /> {publicaciones.length}</div>


        {/*------Calificaciones Perfil-------*/}
     <div> <strong>Calificaciones</strong></div>
       <ul>
          {/*------Map para recorrer las calificaciones del usuario-------*/}
        {calificaciones.map((calificacion, index) => (
          <li 
            className='liCalificaiones' key={index} onMouseEnter={() => {
              if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(null);
              }
              setMostrarRedireccion(index); 
            }}
            onMouseLeave={() => {
              
              {/*------Se aplica un tiempo de 2 seg mejor acceso-------*/}
              const id = setTimeout(() => {
                setMostrarRedireccion(null);
              }, 2000); setTimeoutId(id); 
            }}
            onClick={() => linkCalificacion(calificacion.publicacion)}
          >
            <div className='linkCalificacion'>
              {Number(calificacion.puntaje).toFixed(1)} ✨
            </div>

        {/* Mostrar botón de la calificación */}
        {mostrarRedireccion === index && (
          <div>
            <button className='btnVerCalificacion'>Ir a la Publicación</button>
          </div>
      )}
    </li>
  ))}
</ul>

       <div className='containerData'>
            <strong>Tipo de Usuario:</strong> {publicaciones.length === 0 ? ( <p>Poco Frecuente 😴</p>) : 
              publicaciones.length > 5 ? ( <p>Muy Frecuente 😎</p>) :
              ( <p>Frecuente 😊</p>  )} {/*Valor Intermedio*/}
            </div>


            <button className='btnPerfilEdit' onClick={() => {
                setMostrar(user.id);
                setEdicionAliasUsuario(user.username);
                setEdicionNombre(user.first_name);
                setEdicionEmail(user.email);
                setEditImg(user.img);
              }}  >Editar </button>

              {mostrar === user.id && ( 
              <>

                <input type="text" className='inptCardPerfil' value={edicionAliasUsuario} 
                  onChange={(e) => setEdicionAliasUsuario(e.target.value)} placeholder='Editar Alias Usuario'/> <br />

                <input type="text" className='inptCardPerfil' value={edicionNombre} 
                  onChange={(e) => setEdicionNombre(e.target.value)} placeholder='Editar Nombre'/>  <br />

                <input type="text" className='inptCardPerfil' value={edicionEmail} 
                  onChange={(e) => setEdicionEmail(e.target.value)} placeholder='Editar Email' /> <br />

               {/*Edit Foto de Perfil*/}
               <CloudinaryPerfil onImageUpload={(url) => setEditImg(url)} />
        
                <button className='btnConfirmar' onClick={() => actualizar(user.id)}> Confirmar Edición </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardPefil;
