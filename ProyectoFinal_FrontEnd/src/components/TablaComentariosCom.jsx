import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import { getUsers, patchData, deleteUser } from '../services/MainLlamados';
import "../styles/TablaUsuarios.css";

function TablaComentariosCom() {
    // Estados para los datos y control
    const [comentarios, setComentarios] = useState([]);
    const [reload, setReload] = useState(false);
    const [mostrar, setMostrar] = useState(false);
    const [usuario, setUsuario] = useState(null); // Usuario seleccionado para edición

    // Estados para los inputs del formulario
    const [editNombre, setEditNombre] = useState("");
    const [editEmail, setEditEMail] = useState("");
    const [editTelefono, setEditTelefono] = useState("");
    const [editComentario, setEditComentario] = useState("");

    useEffect(() => {
        async function TraerComentarios() {
            const datos = await getUsers("api/emails-contacto");
            // Orden para que el más reciente (ID mayor) aparezca primero
            const ordenados = [...datos].sort((a, b) => b.id - a.id);
            setComentarios(ordenados);
        }
        TraerComentarios();
    }, [reload]);

    // edicion funtion
    function abrirModal(item) {
        setUsuario(item);
        setEditNombre(item.nombre);
        setEditEMail(item.email);
        setEditTelefono(item.telefono);
        setEditComentario(item.mensaje);
        setMostrar(true);
    }

    // update funcion
    async function actualizarComentarios(id) {
        const actComentario = {
            "nombre": editNombre,
            "email": editEmail,
            "telefono": editTelefono,
            "mensaje": editComentario
        };
        // Verifica si es "emailscontacto" o "emails-contacto"
        await patchData(actComentario, "api/emails-contacto", id);
        setReload(!reload);
        setMostrar(false);
        setUsuario(null);
    }

    //  delete funcion
    async function EliminarContacto(id) {
        await deleteUser(id, "api/emails-contacto");
        setReload(!reload);
    }

    return (
<Table responsive="sm" striped="columns">
    <thead>
        <tr>
            <th style={{ backgroundColor: "#5b5b5b" }} className='pruebaWe'>#</th>
            <th style={{ backgroundColor: "#68c4af" }}>Nombre</th>
            <th style={{ backgroundColor: "#68c4af" }}>Email</th>
            <th style={{ backgroundColor: "#68c4af" }}>Telefono</th>
            <th style={{ backgroundColor: "#68c4af" }}>Comentario</th>
            <th style={{ backgroundColor: "#68c4af" }}>Opciones</th>
        </tr>
    </thead>
    <tbody className='containerTablaUsuarios'>
        {comentarios.map((comentario, index) => (
            <React.Fragment key={comentario.id}>
                {/* FILA DE DATOS PRINCIPAL */}
                <tr>
                    <td style={{ backgroundColor: "#999999" }}>{index + 1}</td>
                    <td>{comentario.nombre}</td>
                    <td>{comentario.email}</td>
                    <td>{comentario.telefono}</td>
                    <td>{comentario.mensaje}</td>
                    <td>
                        <button className='tablaUsuariosDeleteBtn' onClick={() => EliminarContacto(comentario.id)}>
                            Eliminar
                        </button>
                        <button className='tablaUsuariosEditBtn' onClick={() => abrirModal(comentario)}>
                            Editar
                        </button>
                    </td>
                </tr>

                {/* EDICIÓN: Aparece si "mostrar" es true y el ID coincide  doble cumplimiento*/}
                {mostrar && usuario?.id === comentario.id && (
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <td colSpan="6">
                            <div >
                                <input type="text" value={editNombre} className='inputTablaUsuarios' onChange={(e) => setEditNombre(e.target.value)} placeholder='Editar Nombre' />
                                <input type="text" value={editEmail} className='inputTablaUsuarios' onChange={(e) => setEditEMail(e.target.value)} placeholder='Editar Email' />
                                <input type="text" value={editTelefono} className='inputTablaUsuarios' onChange={(e) => setEditTelefono(e.target.value)} placeholder='Editar Telefono' />
                                <input type="text" value={editComentario} className='inputTablaUsuarios' onChange={(e) => setEditComentario(e.target.value)} placeholder='Editar Mensaje' />
                                
                                <div>
                                    <button className='tablaUsuariosConfirmBtn' onClick={() => actualizarComentarios(comentario.id)}>
                                        Guardar Cambios
                                    </button>
                                    <button className='tablaUsuariosDeleteBtn' onClick={() => setMostrar(false)}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
            </React.Fragment>
        ))}
    </tbody>
</Table>
    );
}

export default TablaComentariosCom;