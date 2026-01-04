import React from 'react'
import { useState } from 'react'

const Cloudinary = () => {
    //Nombre del preset configurado en la cuenta de Cloudinary
    const preset_name = "cloudinary01";
    //Nombre de la cuenta de CLoudinary
    const cloud_name = "dqkqgx1as"

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false)

    //Evento que se encarga de subir la img al realizar el isnert o el cambio de img
    const uploadImage = async (e) => {
        const file = e.target.files[0];

        //Creacion de un FormData para enviar el archivo por HTTP
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', preset_name);

        setLoading(true);
        try {
            // Se realiza la petición a la API de Cloudinary
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            setImage(result.secure_url);
            setLoading(false);

             localStorage.getItem("img")

            console.log(result);
            console.log('Url Imagen:', result.secure_url);

            // Guardar la URL en localStorage
            localStorage.setItem("img", result.secure_url); 
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h5>Ingrese la Imagen de la Publicación </h5>

            {/* - El siguiente input file envia la imagen por el evento al handler */}

            <input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={uploadImage}
            />

            {/* ------------------------------------------------------------------------------------ */}


            {/* - Si loading true, Mostramos Loading, si no mostramos la imagen la cual su url deberia estar cargada en un estado local */}
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <img src={image} alt="imagen" />
            )}
            {/* ------------------------------------------------------------------------------------ */}
        </div>
    );
}

export default Cloudinary
