import React from 'react'
import "../styles/TerminosCondiciones.css"

function TerminosCondiciones() {
  return (
    <div>
        <div className='ImgInicioLogo'>
            <a href="/">
         <img src="../src/Images/Logo Pag Noticias.jpg" alt="" />
         </a>
         </div><br /><br />
      <div className="terminos-container">
      <h3 className="terminos-titulo"  >Términos y Condiciones</h3>

      <div className="terminos-contenido">
        <div className="terminos-seccion">
          <h5 className="seccion-titulo">1. Aceptación de los Términos</h5>
          <p className="seccion-texto">
            El acceso y uso del sitio web Noticias Ambientales implica la aceptación plena y sin reservas de estos Términos y Condiciones. Si no estás de acuerdo con alguno de los términos aquí establecidos, por favor abstente de utilizar la Plataforma.
          </p>
        </div>

        <div className="terminos-seccion">
          <h5 className="seccion-titulo">2. Registro de Usuarios</h5>
          <p className="seccion-texto">
           Para enviar contenido (noticias, campañas, artículos u otro tipo de publicaciones), es necesario registrarse como usuario. El proceso de registro requiere que proporciones información veraz, actual y completa. Noticias Ambientales se reserva el derecho de suspender o eliminar cuentas que presenten información falsa o que infrinjan estos términos.
          </p>
        </div>

        <div className="terminos-seccion">
          <h5 className="seccion-titulo">3. Publicación de Contenidos</h5>
          <p className="seccion-texto">
           Todos los contenidos enviados por usuarios serán revisados por nuestro equipo editorial antes de su publicación. Esta revisión tiene como objetivo garantizar que el material sea relevante, veraz y alineado con nuestra misión de informar y empoderar en temas ambientales.
          </p>
        </div>

        <div className="terminos-seccion">
          <h5 className="seccion-titulo">4. Responsabilidad sobre el Contenido</h5>
          <p className="seccion-texto">
           Los usuarios son los únicos responsables del contenido que envían. Al enviar cualquier tipo de contenido, garantizas que tienes los derechos necesarios sobre el mismo y que no infringe derechos de terceros, incluyendo pero no limitándose a derechos de autor, privacidad o propiedad intelectual.
          </p>
        </div>

        <div className="terminos-seccion">
          <h5 className="seccion-titulo">5. Derechos de Uso</h5>
          <p className="seccion-texto">
           Al enviar contenido a la Plataforma, otorgas a Noticias Ambientales una licencia no exclusiva, gratuita, mundial y por tiempo indefinido para usar, reproducir, modificar, adaptar, publicar y distribuir dicho contenido en cualquier medio relacionado con la Plataforma, siempre reconociendo la autoría correspondiente.
          </p>
        </div>

        <div className="terminos-seccion">
          <h5 className="seccion-titulo">6. Conducta del Usuario</h5>
          <p className="seccion-texto">
            Como usuario de la Plataforma, te comprometes a no utilizarla para:<br /><br />
            - Publicar contenido difamatorio, ofensivo, discriminatorio o ilegal.<br />
            - Promover actividades que atenten contra el medio ambiente o los derechos humanos.<br />
            - Infringir derechos de terceros.<br />
            - Utilizar la Plataforma para fines comerciales sin autorización previa.
          </p>
        </div>

        <div className="terminos-seccion">
          <h5 className="seccion-titulo">7. Propiedad Intelectual</h5>
          <p className="seccion-texto">
          Todos los contenidos publicados por el equipo editorial de Noticias Ambientales, incluyendo textos, imágenes, logos y gráficos, son propiedad de la Plataforma o se utilizan bajo licencia, y están protegidos por las leyes de propiedad intelectual. Su reproducción total o parcial está prohibida sin autorización expresa.
          </p>
        </div>

        <div className="terminos-seccion">
          <h5 className="seccion-titulo">8. Modificaciones</h5>
          <p className="seccion-texto">
          Noticias Ambientales se reserva el derecho de modificar en cualquier momento estos Términos y Condiciones. Las modificaciones serán notificadas a través de la Plataforma y entrarán en vigencia desde su publicación. El uso continuado del sitio tras dichos cambios implica tu aceptación de los mismos.
          </p>
        </div>

        <div className="terminos-seccion">
          <h5 className="seccion-titulo">9. Política de Privacidad</h5>
          <p className="seccion-texto">
           La información personal proporcionada durante el registro será tratada conforme a nuestra Política de Privacidad, la cual forma parte integral de estos Términos y Condiciones.
          </p>
        </div>

        <div className="terminos-seccion">
          <h5 className="seccion-titulo">10. Contacto</h5>
          <p className="seccion-texto">
           Para cualquier consulta relacionada con estos Términos y Condiciones, puedes contactarnos desde la pagina de contacto.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default TerminosCondiciones;