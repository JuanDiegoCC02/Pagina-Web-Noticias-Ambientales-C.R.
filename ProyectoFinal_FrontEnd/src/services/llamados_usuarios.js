// Llamados Usuarios

// Prueba Post para validar usuario y calificacion
async function GetCalificacionPorUsuarioYPublicacion(usuarioId, publicacionId) {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/calificaciones/?usuario=${usuarioId}&publicacion=${publicacionId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener calificación");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener calificación:", error);
        throw error;
    }
}











async function GetUsuarios() {
    const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/usuariosGet/`, {
      method: "GET",
      headers: {
       "Authorization": `Bearer ${accessToken}`, 
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}



// Llamado Post de Usuarios
async function PostUsuarios(obj) {
    try {
        const response = await fetch ("http://127.0.0.1:8000/api/usuarios/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(obj)
        });
      const data = await response.json();

        if (!response.ok) {
            throw { response: { data } };
        }
        return data;
    } catch (error) {
        console.error("Error PostUsuarios:", error);
        throw error;
    }
}



// Llamado Uptade de Usuarios
async function UpdateUsuarios(obj, id) {
    const accessToken = localStorage.getItem("accessToken"); 

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/usuarios-editar/${id}/`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error("Error updating user");
        }

        return await response.json();
    } catch (error) {
        console.error("Error update user:", error);
        throw error;
    }
}



//  Llamado Delete de Usuarios
async function DeleteUsuarios(id) {
     const accessToken = localStorage.getItem("accessToken");
    try {
        
        const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}/`, {
            method: 'DELETE',
            headers: {
                 "Authorization": `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user with id ${id}`);
        }

        return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting User:', error);
        throw error;
    }
}



// Exportacion de los llamados
export{
    GetUsuarios,
    PostUsuarios,
    UpdateUsuarios,
    DeleteUsuarios,

    GetCalificacionPorUsuarioYPublicacion
}