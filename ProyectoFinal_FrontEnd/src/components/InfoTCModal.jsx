import React from 'react'
//Mensaje de Temrinos y Condiciones
import "../styles/InfoTCModal.css"

function InfoTCmodal({InfoTC}) {

  return (
    <div>
        <div className='InfoTC'>
            <h5>{InfoTC}</h5>

            
        </div>
    </div>
  )
}

export default InfoTCmodal