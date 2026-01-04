import React, { useState } from 'react';


const CloudinaryPerfil = ({ onImageUpload }) => {
    const preset_name = "cloudinary01";
    const cloud_name = "dqkqgx1as";

    const [loading, setLoading] = useState(false);

    const uploadImagePerfil = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', preset_name);

        setLoading(true);
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            const imageUrl = result.secure_url;

            // Informar al componente padre
            onImageUpload(imageUrl);

            //Guarda url en el localStorage
            localStorage.setItem("img", imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={uploadImagePerfil} />
            {loading && <p>Subiendo imagen...</p>}
        </div>
    );
};
export default CloudinaryPerfil;