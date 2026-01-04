import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react'
import { getUsers, patchData, deleteUser } from '../services/MainLlamados'
import "../styles/TablaUsuarios.css"

function TablaComentariosCom() {
    // Se utiliza para el GET de comentarios
    const [comentarios, setComentarios] = useState ([])
    // Para recargar
    const [reload, setReload] = useState (false)
    // Abrir el input y btn para poder editar la informacion
    const [mostrar, setMostrar] = useState(false)
    // Se utiliza para el EDIT de comentarios
    const [editNombre, setEditNombre] = useState("")
    const [editEmail, setEditEMail] = useState("")
    const [editTelefono, setEditTelefono] = useState("")
    const [editComentario, setEditComentario] = useState("")
    const [usuario,setUsuario] = useState(null) //Estado para almacenar el usuario seleccionado para edición

  useEffect(() => {
    // Si hay un usuario activo, se precargan sus datos en los inputs
    if(usuario){
      console.log("entra al usuario");
      console.log(usuario);
      setEditNombre(usuario.nombre)
    }
    // Funcion GET para mostrar los comentarios
    async function TraerComentarios() {
      const datos = await getUsers("api/emails-contacto")
      setComentarios (datos)
    }
    TraerComentarios()
  }, [reload])

  // Funcion PATCH para poder editar la informacion 
  async function actualizarComentarios(id) {
    const actComentario = {
      "nombre" : editNombre,
      "email" : editEmail,
      "telefono" : editTelefono,
      "mensaje" : editComentario
    }
    await patchData (actComentario, "api/emailscontacto", id)
    setReload(!reload)
    setMostrar(!mostrar)
  }

  // Funcion DELETE para eliminar solicitudes de contacto
  async function EliminarContacto(id) {
  await deleteUser(id, "api/emailscontacto")
  setReload(!reload)
}

  // Funcion para abrir el modal en el Btn de editar que despliega inputs en los que
  // se coloca la nueva informacion y un btn de confirmar
  function abrirModal(usuario) {  
    setUsuario(usuario) 
    setEditNombre(usuario.nombre)
    setEditEMail(usuario.email)
    setEditTelefono(usuario.telefono)
    setEditComentario(usuario.mensaje)
    setMostrar(true)
    console.log(editNombre);
  }

  return (
     <Table responsive="sm" striped="columns">
      <thead >
        <tr> {/*Para mostrar a que cuadro pertenece la información */}
          <th style={{backgroundColor:"#5b5b5b"}} className='pruebaWe'>#</th>
          <th style={{backgroundColor:"#68c4af"}}>Nombre</th>
          <th style={{backgroundColor:"#68c4af"}}>Email</th>
          <th style={{backgroundColor:"#68c4af"}}>Telefono</th>
          <th style={{backgroundColor:"#68c4af"}}>Comentario</th>
          <th style={{backgroundColor:"#68c4af"}}>Opciones</th>
        </tr>
      </thead>
      <tbody className='containerTablaUsuarios ' >
        {comentarios.map((comentario, index) => (
        <tr key={comentario.id}>
          <td style={{backgroundColor:"#999999"}} >{index + 1}</td>
          <td>{comentario.nombre}</td>
          <td>{comentario.email}</td>
          <td>{comentario.telefono}</td>  
          <td>{comentario.mensaje}</td>
          <button className='tablaUsuariosDeleteBtn' onClick={()=> EliminarContacto(comentario.id)}>Eliminar</button>
          <button className='tablaUsuariosEditBtn' onClick={()=> abrirModal(comentario)}>Editar</button>
        </tr>
        ))}             
         
      </tbody>
       {mostrar &&
              <> <br /> 
              {/*/Value se muestra en el input, vinculado al estado que tenga dentro de las llaves*/}
              {/*Onchange actualiza el estado cada vez que cambia el valor del input*/}
              <input type="text" value={editNombre} className='inputTablaUsuarios' onChange={(e) => setEditNombre(e.target.value)} placeholder='Editar Nombre' />
              <br />
              <input type="text" value={editEmail}  className='inputTablaUsuarios' onChange={(e) => setEditEMail(e.target.value)} placeholder='Editar Email' />
              <br />
              <input type="text" value={editTelefono}  className='inputTablaUsuarios' onChange={(e) => setEditTelefono(e.target.value)} placeholder='Editar Telefono' />
              <br />
              <input type="text" value={editComentario}  className='inputTablaUsuarios' onChange={(e) => setEditComentario(e.target.value)} placeholder='Editar Mensaje' />
              <br />
              <button className='tablaUsuariosConfirmBtn' onClick={() => actualizarComentarios(usuario.id)}>Confirmar Edit</button>
              </>
          }
       
    </Table>
)
}

export default TablaComentariosCom