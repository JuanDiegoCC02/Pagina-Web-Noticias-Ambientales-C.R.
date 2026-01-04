from .models import Usuarios, TipoPublicaciones, Publicaciones, EmailsContactos,Comentarios, RespuestaComentarios, Calificaciones
from rest_framework import serializers
from django.contrib.auth.models import User

#Serializers 

#Serializer Users
class UsersSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = '__all__'


#Serializer Usuarios conexion entre tablas
class UsuariosSerializer(serializers.ModelSerializer):
    usuario_alias = serializers.CharField(source="usuario.username",read_only=True)
    usuario_nombre = serializers.CharField(source="usuario.first_name",read_only=True)
    usuario_apellido = serializers.CharField(source="usuario.last_name",read_only=True)
    usuario_email = serializers.CharField(source="usuario.email",read_only=True)
    usuario_date_joined = serializers.DateTimeField(source="usuario.date_joined", read_only=True)
    class Meta:
        model = Usuarios
        fields = ["id","fecha_nacimiento","telefono","usuario","usuario_alias","usuario_nombre","usuario_apellido","usuario_email", "usuario_date_joined"]


#Serializer EDIT Usarios
class UsuariosEditarSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"  


#Serializer Emails de Contactos
class EmailContactosSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailsContactos
        fields =  '__all__'


#Serializer Tipo Publicaciones
class TipoPublicacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoPublicaciones
        fields = '__all__'


#Serializers Publicaciones
class PublicacionesSerializer(serializers.ModelSerializer):
    nombre_tipo_publicacion = serializers.CharField(source="tipopublicacion.nombre", read_only=True)
    class Meta:
        model = Publicaciones  
        fields = [
            "id", "titulo", "descripcion", "latitud", "longitud", "img", 
            "estado_publicacion", "tipopublicacion", "usuario", 
            "nombre_tipo_publicacion", "calificacion","reporte"
        ]



#Serializer Calificacion
class CalificacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calificaciones
        fields = '__all__'


#Serializer Comentarios
class ComentariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentarios
        fields = '__all__'


#Serializer Respuesta de Comentarios
class RespuestaComentariosSerializer(serializers.ModelSerializer):
    usuario_alias = serializers.CharField(source="usuarios.username", read_only=True)
    comentario_responde = serializers.CharField(source="comentarios.contenido", read_only=True)
    class Meta:
        model = RespuestaComentarios
        fields = [
            "id", "contenido", "fecha", "usuario","usuario_alias", "comentario_responde","comentario", "publicacion"
        ]
