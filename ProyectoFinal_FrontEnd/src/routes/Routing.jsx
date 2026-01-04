import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegistroPage from '../pages/RegistroPage';
import InicioSesionPage from '../pages/InicioSesionPage';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Moderador from '../pages/Moderador';
import Noticias from '../pages/Noticias';
import TablaUsuarios from '../pages/tablaUsuarios';
import TablaComentarios from '../pages/TablaComentarios';
import NoticiasAdmin from '../pages/NoticiasAdmin';

import PrivateRoutes from '../components/PrivateRoutes';
import Perfil from '../pages/Perfil';
import FullNoticias from '../pages/FullNoticias';
import PageTermCond from '../pages/PageTermCond';

function Routing() {
  return (
   <Router>
        <Routes>   
            {/*Rutas Privadas*/}
            <Route path="/admin" element={<PrivateRoutes children={<NoticiasAdmin/>} rol="Administrador"/>}/>
            <Route path="/moderador" element={<PrivateRoutes children={<Moderador/>} rol="Administrador"/>}/>
            <Route path="/tablacomentarios" element={<PrivateRoutes children={<TablaComentarios/>} rol="Administrador"/>}/>
            <Route path="/tablausuarios" element={<PrivateRoutes children={<TablaUsuarios/>} rol="Administrador"/>}/>
            <Route path="/perfil" element={<Perfil/>}/>

            {/*Rutas Publicas*/}
            <Route path="/" element={<Home/>}/>
            <Route path = '/registro' element = {<RegistroPage/>}/> 
            <Route path = '/inicio' element = {<InicioSesionPage/>}/> 
            <Route path = '/noticias' element = {<Noticias/>}/> 
            <Route path = "/contacto" element={<Contact/>}/>
            <Route path = "/noticiafull" element={<FullNoticias/>}/>
            <Route path = "/noticiafull/:id" element={<FullNoticias />} />

             <Route path = "/termcond" element={<PageTermCond />} />
        </Routes>
   </Router>

  )
}

export default Routing