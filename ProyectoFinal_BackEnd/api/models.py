from django.db import models
# from para una conexion entre la tabla de django y la tabla propia
from django.contrib.auth.models import User


#Modelo Usuarios
class Usuarios(models.Model):
    #relacion entre la tabla creada por nosotros y la creada por django
    usuario = models.OneToOneField(User,on_delete=models.CASCADE)
    foto_perfil = models.TextField(null=True, blank=True)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=50)


#Modelo Tipo Publicaciones
class TipoPublicaciones(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre


#Modelo del estado las Publicaciones
class Publicaciones(models.Model):
    OPCIONES_ESTADO = (
        ("publicada", "Publicada"),
        ("pendiente", "Pendiente"),
        ("rechazada", "Rechazada"),
    )
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    latitud = models.CharField(max_length=50)
    longitud = models.CharField(max_length=50)
    img = models.CharField(max_length=150)
    estado_publicacion = models.CharField(max_length=100,choices=OPCIONES_ESTADO, default="pendiente")
    tipopublicacion = models.ForeignKey(TipoPublicaciones, on_delete = models.CASCADE, related_name= 'publicaciones' )   
    usuario = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'publicaciones') 
    calificacion = models.FloatField(default=0)
    reporte = models.IntegerField(default=0)
    def __str__(self):
        return self.titulo
    

#Modelo Comentarios
class Comentarios(models.Model):
    contenido = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comentarios")
    publicacion = models.ForeignKey(Publicaciones, on_delete=models.CASCADE, related_name="comentarios")
    def __str__(self):
        return self.contenido


#Modelo Respuesta Comentarios
class RespuestaComentarios(models.Model):
    contenido = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="respuestas")
    comentario = models.ForeignKey(Comentarios, on_delete=models.CASCADE, related_name="respuestas")
    publicacion = models.ForeignKey(Publicaciones, on_delete=models.CASCADE, related_name="respuestas")


#Modelo Emails de Contactos
class EmailsContactos(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    telefono = models.CharField(max_length=80)
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)


#Modelo Calificaciones
class Calificaciones(models.Model):
    puntaje = models.DecimalField(max_digits=3, decimal_places=1)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="calificaciones")
    publicacion = models.ForeignKey(Publicaciones, on_delete=models.CASCADE, related_name="calificaciones")

    class Meta:
        unique_together = ('usuario', 'publicacion')  

    def __str__(self):
        return f"{self.usuario.username} - {self.publicacion.titulo} - {self.puntaje} estrellas"
