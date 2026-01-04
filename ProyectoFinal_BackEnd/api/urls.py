from django.urls import path
from .views import  UsuariosListCreateView, TipoPublicacionesListCreateView, PublicacionesListCreateView, EmailContactoListCreateView
from .views import  UsuariosDetailView, TipoPublicacionesDetailView, PublicacionesDetailView, EmailsContactosDetailView, RespuestaComentariosDetailView
from .views import  AggUsuarioView,LoginView,UsuarioEditarView, ComentariosListCreateView, ComentariosDetailView, UsersSerializerLiscreateView
from .views import RespuestaComentariosListCreateView, CalificacionesListCreateView, GetUsuarioView, CalificacionesView


urlpatterns = [

    path ('users/', UsersSerializerLiscreateView.as_view()),
    path ('usuarios/', AggUsuarioView.as_view(), name = 'usuarios-list-create'),
    path ('usuarios-editar/<int:id>/', UsuarioEditarView.as_view(), name = 'usuarios-editar'),
    path ('usuariosGet/', GetUsuarioView.as_view()),
    path ('usuarios-mostrar/', UsuariosListCreateView.as_view()),
    
    path ('login/', LoginView.as_view(), name = 'usuarios-list-create'),
    path ('emails-contacto/', EmailContactoListCreateView.as_view()),
   
    path ('tipopublicaciones/', TipoPublicacionesListCreateView.as_view(), name = 'tipopublicaciones-list-create'),
    path ('publicaciones/', PublicacionesListCreateView.as_view(), name = 'publicaciones-list-create'),
    path ('calificaciones/', CalificacionesListCreateView.as_view()),
    path ('comentarios/', ComentariosListCreateView.as_view()),
    path ('respuestascomentarios/', RespuestaComentariosListCreateView.as_view()),
    path ('calificacion_usuario/<int:id>/', CalificacionesView.as_view()),
  
   
    path ('usuarios/<int:pk>/', UsuariosDetailView.as_view(), name = 'usuarios-editar-actualizar'),
    path ('tipopublicaciones/<int:pk>/', TipoPublicacionesDetailView.as_view(), name = 'tipopublicaciones-editar-actualizar'),
    path ('publicaciones/<int:pk>/', PublicacionesDetailView.as_view()),
    path ('emailscontacto/<int:pk>/', EmailsContactosDetailView.as_view()),
    path ('comentarios/<int:pk>/', ComentariosDetailView.as_view()),
    path ('respuestascomentarios/<int:pk>/', RespuestaComentariosDetailView.as_view(), name = 'respuestascomentarios-editar-actualizar'),

]
