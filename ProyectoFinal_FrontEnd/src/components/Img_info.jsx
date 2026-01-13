import React from 'react'
import "../styles/Img_info.css"


function Img_info() {
  return (
    <>
    <div className='ImgContainer'>

        <div className='ImgBox'>
          <img className='imgInfo' src="../src/images/perezoso.png" alt="" />
        </div>

        <div className='ImgBox'>
          <img className='imgInfo' src="src/images/ArbolesImage.png" alt="" />
          </div>

        <div className='ImgBox'>
          <img className='imgInfo' src="src/images/MapaCRImage.png" alt="" />
          </div>

        <div className='ImgBox'>
          <img className='imgInfo' src="src/images/FloraImage.png" alt="" />
          </div>

        <div className='ImgBox'>
          <img className='imgInfo' src="src/images/FaunaIMG.jpg" alt="" />
          </div>
    </div>


    </>

)
}

export default Img_info