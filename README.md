# -Página Web Noticias Ambientales C.R.   /Proyecto Final Back-End/ 
Estudiantes: Joseph Monge y Juan Diego Corella

En este Proyecto decidimos desarrollar una Página Web de Noticias Ambientales en Costa Rica, con el objetivo de permitir a los ciudadanos mantenerse informados sobre los sucesos ecológicos y
 ambientales en el país, además de la creación de campañas en busca de la colaboración activa en iniciativas de mitigación fomentando la interacción y el compromiso de los ciudadanos, no solo 
 informandolos si no tambien permitiendo a los ciudadanos informar sobre los sucesos que estén pasando en el territorio de Costa Rica y de los cuales quieran brindar información. 


#Tecnologias (Back-End)
Python
Django
Django Rest Framework
JWT (Simple JWT)
Base de Datos My SQL
Django Admin
Cludinary


#Autenticación y grupos
La autenticación se maneja con JWT (access y refresh token).
Grupos principales:
-Usuario: Puede publicar, comentar, calificar y ver publicaciones, ademas de poder editar datos de su entorno como su perfil y datos personales.
-Administrador: Acceso completo en toda la pagina y permisos CRUD para datos e información de la página. 


#Funcionalidades
Registro e Inicio de Sesión de Usuarios con verificación de los datos.
JWT para autenticación segura.
Panel de administración con Django Admin.
Permisos personalizados según el grupo (Usuario / Administrador).
Publicaciones con contenido de tipos de publicaciones, con estado de la publicación, ubicación de geolocalización  (latitud/longitud) y con almacenamiento de imagenes.
Sistema de comentarios y respuestas a comentarios.
Calificación de publicaciones.
Formulario de Contacto.
Gestion del perfil de usuario. (Fecha de Nacimiento, Foto de Perfil y Teléfono).


#Estructura del Back-End

>ProyectoFinal_BackEnd
├──> api
│ ├──> __pycache__
│ ├──> migrations 
│ ├── _init_.py
│ ├── admin.py
│ ├── apps.py
│ ├── models.py
│ ├── serializers.py
│ ├── tests.py
│ ├── urls.py
│ ├── views.py
│
│──── > ProyectoFinal_BackEnd
└── manage.py

<h1>FRONT END</h1>
<HR>
El Home (Landing Page) Al inicio en la parte superior se encuentra el NavBar/Header que da acceso a la navegación de las demás páginas, luego justo por debajo de esta se encuentra la misión y visión que habla sobre nuestros ideales y razonamiento detrás de este proyecto, también se encuentra una sección de Cards con imágenes informativas sobre el medio ambiente, luego se encuentran las publicaciones en las que se pueden encontrar noticias o campañas ambientales, en estos cards se muestra la información principal y al ingresar al "Ver más" se logra ver la noticia completa, en la que se puede ver la ubicación del suceso, se puede calificar la noticia, reportar la noticia que al llegar a 20 reportes se le cambia el estado a pendiente y se remueve del home a la página de administradores (a la que no tienen acceso los usuarios normales), también se le pueden agregar comentarios a las noticias ya que saber la opinión de los usuarios es una parte fundamental de las publicaciones, cada comentario realizado se puede observar, responder, editar y eliminar (Estás 2 últimas solo se le permiten al usuario con sus propios comentarios o respuestas) además de ver el número del usuario que realizó el comentario, por último se encuentra el Footer que contiene información sobre la página, redes sociales y Copyright.

<HR>

<h2>NavBar</h2>
Mediante este NavBar se puede Navegar por toda la página, el navbar de usuarios tiene 6 redirecciones que permiten todos los saltos de página que deben tener los usuarios para ir a la página principal(Home), el formulario de noticias y la página de Contacto, también se encuentra una tuerca despegable en la cual se puede ver el perfil de usuario y cerrar sesión, el navbar de administradores tiene un parentesco casi que exacto excepto que este contiene una sección de Moderador la cual redirige a una ruta privada y no se le debe mostrar a los usuarios.

<HR>

<h2>Formulario de Publicaciones</h2>
En este formulario es donde los usuarios podrán informar sobre noticias o campañas ambientales, solamente con completar los siguientes campos de Titulo Noticia, Descripción Noticia, Tipo de Publicación (Noticia o Campaña), ubicación o ubicación aproximada mediante el mapa que captura las coordenadas, y una imagen para representar la publicación.

<HR>

<h2>Contacto</h2>
En esta página se encuentra un formulario de contacto en el cual se solicita la información de la persona cómo el nombre, email y teléfono y el mensaje que quieran enviarnos, también se encuentra un card con toda la información de contacto para que los usuarios tengan más opciones, en esta se comparte la ubicación, teléfono, email, horario y redes sociales.

<HR> 	

<h2>Administrador</h2>
En está página se accede mediante el NavBar al acceder con un usuario con el rol de administrador se mostrará una opción de Moderador en el NavBar, al ingresar se encuentra una tabla con el CRUD de usuarios y dos gráficas, una mostrando cuantas Noticias comparado con Campañas y la otra mostrando la cantidad de usuarios con el tiempo, en el lado superior izquierdo se encuentra un sidebar el cuál contiene opciones para redireccionar hacia la Tabla de Usuarios, Tabla de Contacto, Administración de las noticias, en cada una de estas se encuentra el CRUD de GET, EDIT y DELETE, adicionalmente en administración de noticias se encuentra un botón en el que se puede cambiar el estado de la publicación, existen 3 estados que son "Publicada", "Rechazada" y "Pendiente" solo las publicaciones que tengan el estado de aceptada se mostraran a los usuarios, si una publicación llega a 20 reportes se le cambiará el estado a pendiente y dejara de mostrarse a los usuarios.  
