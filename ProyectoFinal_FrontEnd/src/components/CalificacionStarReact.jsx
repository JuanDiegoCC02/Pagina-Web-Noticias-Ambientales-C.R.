import React, { useState, useEffect } from 'react'
import ReactStars from 'react-stars'
import { GetCalificacionPorUsuarioYPublicacion } from '../services/llamados_usuarios'
import { postUsers } from '../services/MainLlamados'


function CalificacionStarReact() {
  const [rating, setRating] = useState(0)
  const [disabled, setDisabled] = useState(false)

  const idUsuario = localStorage.getItem("id")
  const idPublicacion = localStorage.getItem("id_publicacion")

  
  useEffect(() => {
    async function verificarCalificacion() {
      try {
        const respuesta = await GetCalificacionPorUsuarioYPublicacion(idUsuario, idPublicacion)
        if (respuesta && respuesta.length > 0) {
          setRating(respuesta[0].puntaje)
          setDisabled(true)
          localStorage.setItem('calificacion', respuesta[0].puntaje)
        }
      } catch (error) {
        console.error("Error verificando calificación:", error)
      }
    }

    verificarCalificacion()
  }, [])

  const ratingChanged = (newRating) => {
    if (!disabled) {
      setRating(newRating)
    }
  }

  async function enviarCalificacion() {
    const objCalificacion = {
      puntaje: parseFloat(rating),
      usuario: (idUsuario),
      publicacion: (idPublicacion)
    }

    try {
      const peticion = await postUsers(objCalificacion, "api/calificaciones/")
      console.log("Respuesta del servidor:", peticion)
      setDisabled(true) 
    } catch (error) {
      console.error("Error al enviar calificación:", error)
    }
  }

  return (
    <>
      <div className="container mt-5">
        <h3>Calificación:</h3>
        <ReactStars
          count={5}
          value={rating}
          onChange={ratingChanged}
          size={24}
          color2={'#ffd700'}
          edit={!disabled} 
        />
      </div>
      <button
        className='btnCalificarNoticiasFull'
        onClick={enviarCalificacion}
        disabled={disabled}
      >
        {disabled ? "Ya calificaste" : "Calificar"}
      </button>
    </>
  )
}

export default CalificacionStarReact
