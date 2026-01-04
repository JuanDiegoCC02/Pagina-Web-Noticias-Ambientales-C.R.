import React from 'react'
import "../styles/CardHome.css"

function CardHome() {
  //Cards Informativos de Misión y Visión que se encuentran en el inicio del Home
  return (
    <div className='CardContainer'>
        <div className='Card'>
        <div className='CardContent'>
        <h1>Misión</h1>
        <hr className='CardBars' />
        <h2></h2>
        <h2>Informar y empoderar a nuestra audiencia sobre temas ambientales cruciales, fomentando la acción y la conciencia ecológica.</h2>
            <a href="" className='readMoreCard'></a>
        </div>
        </div>
   
        <div className='Card'>
        <div className='CardContent'>
            <h1>Visión</h1>
            <hr className='CardBars' />
            <h2></h2>
            <h2>Lograr una sociedad más informada y comprometida con la protección del medio ambiente, a través de un periodismo ambiental riguroso y accesible. </h2>
            <a href="" className='readMoreCard'></a>
        </div>

        </div>

    </div>
  )
}

export default CardHome