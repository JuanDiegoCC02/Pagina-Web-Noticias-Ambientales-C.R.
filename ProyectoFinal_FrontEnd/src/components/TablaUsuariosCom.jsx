import Table from 'react-bootstrap/Table';

import React, { useEffect, useState } from 'react'
import { DeleteUsuarios, GetUsuarios, UpdateUsuarios,  } from '../services/llamados_usuarios'
import "../styles/TablaUsuarios.css"

function StripedColumnsExample() {

  const [usuarios, setUsuarios] = useState ([])
  
  const [reload, setReload] = useState (false)
  
  // Editar información de usuarios
  const [editUserId, setEditUserId] = useState(null)
  const [edicionAliasUsuario, setEdicionAliasUsuario] = useState("")
  const [edicionNombre, setEdicionNombre] = useState("")
  const [edicionApellido, setEdicionApellido] = useState("")
  const [edicionEmail, setEdicionEmail] = useState("")
  const [edicionFechaNacimiento, setEdicionFechaNacimiento] = useState("")
  const [edicionTelefono, setEdicionTelefono] = useState("")

  // Funcion para mostrar los usuarios mediante un GET
  useEffect(() => {
    async function list() {
      const datos = await GetUsuarios()
      setUsuarios (datos)
      console.log (datos)
    }
    list()
  }, [reload])

  const startEdit = (user)=>{
    if (editUserId === user.id) {
      setEditUserId(null)
    } else {
      setEditUserId(user.id)
      setEdicionAliasUsuario(user.username)
      setEdicionNombre(user.first_name)
      setEdicionApellido(user.last_name)
      setEdicionEmail(user.email)
      setEdicionFechaNacimiento(user.fecha_nacimiento)
      setEdicionTelefono(user.telefono)
    }
  }

  // Funcion para editar la información de los usuarios
async function actualizar(id) {
  const p = {
    "username": edicionAliasUsuario,
    "first_name": edicionNombre,
    "last_name": edicionApellido,
    "email": edicionEmail,
    "fecha_nacimiento": edicionFechaNacimiento,
    "telefono": edicionTelefono

  }
  await UpdateUsuarios(p, id)
  setReload(!reload)
  setEditUserId(null)
}
// Función para eliminar Usuarios
async function EliminarUsuarios(id) {
  await DeleteUsuarios(id)
  setReload(!reload)
}

  return (
    <Table  responsive="sm" striped="columns">
      <thead >
        <tr> {/*Para mostrar a que cuadro pertenece la información */}
          <th style={{backgroundColor:"#5b5b5b"}} className='pruebaWe'>#</th>
          <th style={{backgroundColor:"#68c4af"}}>Alias Usuario</th>
          <th style={{backgroundColor:"#68c4af"}}>Nombre</th>
          <th style={{backgroundColor:"#68c4af"}}>Apellido</th>
          <th style={{backgroundColor:"#68c4af"}}>Email</th>
          <th style={{backgroundColor:"#68c4af"}}>Fecha de Nacimiento</th>
          <th style={{backgroundColor:"#68c4af"}}>Telefono</th>
          <th style={{backgroundColor:"#68c4af"}}>Opciones</th>
        </tr>
      </thead>  
      <tbody className='containerTablaUsuarios ' >
        {usuarios.map((user, index) => (
        <tr key={user.id}>
          <td style={{backgroundColor:"#999999"}} >{index + 1}</td>
          <td>{user.username}</td>
          <td>{user.first_name}</td> 
          <td>{user.last_name}</td>
          <td>{user.email}</td>
          <td>{user.fecha_nacimiento}</td>
          <td>{user.telefono}</td>
          <td>
          <button className='tablaUsuariosDeleteBtn' onClick={()=> EliminarUsuarios(user.id)}>Eliminar</button>
          <button className='tablaUsuariosEditBtn' onClick={()=> startEdit(user)}>
            {editUserId === user.id ? "cancel" : "edit"}
          </button>
          {editUserId === user.id &&
              <> <br />
              {/*/Value se muestra en el input, vinculado al estado que tenga dentro de las llaves*/}
              {/*Onchange actualiza el estado cada vez que cambia el valor del input*/}
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEdicionAliasUsuario(e.target.value)} placeholder='Editar Alias Usuario' />
              <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEdicionNombre(e.target.value)} placeholder='Editar Nombre' />
              <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEdicionApellido(e.target.value)} placeholder='Editar Apellido' />
              <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEdicionEmail(e.target.value)} placeholder='Editar Email' />
              <br /> 
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEdicionFechaNacimiento(e.target.value)} placeholder='Editar Fecha Nacimiento' />
              <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEdicionTelefono(e.target.value)} placeholder='Editar Telefono' />
  
              <button className='tablaUsuariosConfirmBtn    ' onClick={() => actualizar(user.id)}>guardar edit</button> 
              </>
                    }
          </td>
        </tr>


                ))}
         
      </tbody>
    </Table>
  );
}

export default StripedColumnsExample;