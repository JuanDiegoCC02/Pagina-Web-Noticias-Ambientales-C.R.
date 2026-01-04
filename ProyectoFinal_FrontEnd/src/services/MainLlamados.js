const token = localStorage.getItem("accessToken");

async function getUsers(endpoint,id='') {
   //cambio de id
    try {
        const response = await fetch(`http://127.0.0.1:8000/${endpoint}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching users');
        }

        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}


//////////LLAMADO POST//////////

async function postUsers(obj,endpoint) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        });

     
        return await response.json();

            
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}


//////////////LLAMADO UPDATE/////////////


async function updateUsers(logInUser, logInPassword, MdUsu) 
{
    try {
     
        const userData = { 
            logInUser, 
            logInPassword,
            MdUsuario
        };


        const response = await fetch("http://127.0.0.1:8000/users/"+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

     
        return await response.json();
    } catch (error) {
        console.error('Error update user:', error);
        throw error;
    }
}


////////LLAMADO PATCH//////////////

async function patchData(estado,endpoint,id) 
{
    try {
        const response = await fetch(`http://127.0.0.1:8000/${endpoint}/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(estado)
        });
        const data = await response.json()
        console.log(data);
        return data
    } catch (error) {
        console.error('Error update user:', error);
        throw error;
    }
}


//////////////LLAMADO DELETE/////////////

async function deleteUser(id,endpoint) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/${endpoint}/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user with id ${id}`);
        }

        return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}


//////////////////////////Post Contacto sin autentificacion {Para tabla independiente de EmailsContacto}////////////////////////
async function postContacto(obj,endpoint) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              
            },
            body: JSON.stringify(obj)
        });

     
        return await response.json();

            
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}



export { getUsers, postUsers, updateUsers, patchData, deleteUser, postContacto };