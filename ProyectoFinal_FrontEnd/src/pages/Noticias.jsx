import React from 'react'
import NavBar from '../components/Navbar'
import NoticiasTitulo from '../components/NoticiasTitulo'
import NoticiasForm from '../components/NoticiasForm'
import Footer from '../components/Footer'


import { useState,useEffect } from 'react'
import { getUsers } from '../services/MainLlamados'
import CardsNoticias from '../components/CardNoticias'
import { useNavigate } from 'react-router-dom'


function Noticias() {
  const [noticias,setNoticias] = useState([]) // Para almacenar noticias filtradas
  const navigate = useNavigate()

  useEffect(()=>{
    async function traeNoticias() {
      const peticion = await getUsers("api/publicaciones")
      // Filtro para mostrar solo publicaciones que tengan el estado de "publicada"
      const filtro = peticion.filter((peticion)=> peticion.estado_publicacion === "publicada")
      setNoticias(filtro)  //Para actualizar el estado con las noticias filtradas
    }
    traeNoticias()
  }, []) // Arreglo vacío significa que solo se ejecuta una vez

  return (
 <div>
  <nav>
    <NavBar/>
    
   </nav>,

  <main>
    
    <NoticiasForm/>
     <NoticiasTitulo />
      {/*Para renderizar los cards con las publicaciones*/}
     <div className='d-flex flex-row gap-3 flex-wrap mx-auto justify-content-center'>
        {noticias.map((noticia) => {
          return (
            <CardsNoticias key={noticia.id} title={noticia.titulo} text={noticia.descripcion} imgSrc={noticia.img} getId={() => {
              localStorage.setItem("id_publicacion", noticia.id)  // Para guardar el id de la publicacion y asi poder ingresar a la misma
              navigate('/noticiafull')
            }} />
          );
        })}
        </div>
   
    
    </main>

    <footer>
      <Footer/>
    </footer>
   </div>
  )
}

export default Noticias