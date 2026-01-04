import React from 'react'
import { Link } from 'react-router-dom'

// Ruta Privada
// Esta funcion hace que el usuario sea igual al rol de grupoUsuario y así solo se muestren las rutas que su rol tiene permitidas
    function PrivateRoutes({children,rol}) {
        function usuarioValido() {
            const usuario = localStorage.getItem("grupoUsuario")
            if (usuario===rol) {
                return true
            }else{
                return false
            }
    }    
  return (
    <>
   {usuarioValido() ? children : <div>GO TO REGISTER <Link to={"/registro"}>Usted no tiene los permisos para ver esta página</Link></div>}
   </>

)
}

export default PrivateRoutes