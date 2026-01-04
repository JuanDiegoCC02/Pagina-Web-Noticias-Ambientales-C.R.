import React, { useEffect, useState } from 'react';
import { GetUsuarios, UpdateUsuarios } from '../services/llamados_usuarios';
import Cloudinary from './Cloudinary'; // Asegúrate de que la ruta sea correcta

function PerfilCloudinary() {
  const [usuario, setUsuario] = useState([]);
  const [reload, setReload] = useState(false);

  // Estados de edición
  const [mostrar, setMostrar] = useState(null); // control individual por ID
  const [edicionAliasUsuario, setEdicionAliasUsuario] = useState('');
  const [edicionNombre, setEdicionNombre] = useState('');
  const [edicionEmail, setEdicionEmail] = useState('');
  const [editImg, setEditImg] = useState('');

  // Obtener usuarios al cargar
  useEffect(() => {
    async function traerUsuario() {
      const id = localStorage.getItem('id');
      if (!id) return;

      const data = await GetUsuarios(`api/usuarios/${id}`);
      setUsuario(data);
    }

    traerUsuario();
  }, [reload]);
  // Función de actualización
  async function actualizar(id) {
    const imagenActualizada = localStorage.getItem('img') || editImg;

    const usuarioActualizado = {
      username: edicionAliasUsuario,
      first_name: edicionNombre,
      email: edicionEmail,
      img: imagenActualizada,
    };

    await UpdateUsuarios(usuarioActualizado, id);
    setReload(!reload);
    setMostrar(null); 
  }

  // Mostrar lista
  return (
    <div>
      <ul className="listaUsuarios">
        {usuario.map((user, index) => (
          <li key={user.id} className="usuarioItem">
            <div><strong>Alias Usuario:</strong> {user.usuario_alias}</div>
            <div><strong>Nombre:</strong> {user.usuario_nombre}</div>
            <div><strong>Email:</strong> {user.usuario_email}</div>
            <div><strong>Cantidad de Publicaciones:</strong> {user.usuario_publicaciones}</div>
            <div><strong>Tipo de Usuario:</strong> {user.tipo_usuario}</div>
            <div>
              <strong>Imagen:</strong><br />
              <img src={user.img} alt="Perfil" className="perfilIMG" width={150} />
            </div>

            <button
              className='tablaUsuariosEditBtn'
              onClick={() => {
                setMostrar(user.id);
                setEdicionAliasUsuario(user.usuario_alias);
                setEdicionNombre(user.usuario_nombre);
                setEdicionEmail(user.usuario_email);
                setEditImg(user.img);
              }}
            >
              Editar
            </button>

            {mostrar === user.id && (
              <>
                <br />
                <input
                  type="text"
                  className='inputTablaUsuarios'
                  value={edicionAliasUsuario}
                  onChange={(e) => setEdicionAliasUsuario(e.target.value)}
                  placeholder='Editar Alias Usuario'
                />
                <br />
                <input
                  type="text"
                  className='inputTablaUsuarios'
                  value={edicionNombre}
                  onChange={(e) => setEdicionNombre(e.target.value)}
                  placeholder='Editar Nombre'
                />
                <br />
                <input
                  type="text"
                  className='inputTablaUsuarios'
                  value={edicionEmail}
                  onChange={(e) => setEdicionEmail(e.target.value)}
                  placeholder='Editar Email'
                />
                <br />
                <Cloudinary />
                <br />
                <button
                  className='tablaUsuariosConfirmBtn'
                  onClick={() => actualizar(user.id)}
                >
                  Confirmar Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PerfilCloudinary;
