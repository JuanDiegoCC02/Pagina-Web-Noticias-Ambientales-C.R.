import { useState } from "react";
import "../styles/Geolocalizacion.css";
import "leaflet/dist/leaflet.css";

//Import de los Componentes de la Libreria de React-Leaflet
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";


function Geolocalizacion() {
  const [posicion, setPosicion] = useState(null);

  // Funcion para el manejo del click en el map
  function ClickMap({ setPosicion }) {
    useMapEvents({
      click: (e) => {
        
        //Obtiene la lat y la long de la posicion marcada con la funcion click
          const nuevaPosicion = [e.latlng.lat, e.latlng.lng];

        //Se actualizan los datos con la nueva posicion marcada
      setPosicion(nuevaPosicion);

      // insert de la long y lat al localStorage
      localStorage.setItem("posicion", JSON.stringify(nuevaPosicion));

        console.log(nuevaPosicion)
        
      },
    });
    
    return null;  
  }


  return (
    //Componente base que renderiza el mapa, ademas de definir el centro y el zoom que va tener
    <MapContainer
      center={[9.9236, -84.0749]} zoom={10} scrollWheelZoom={false} style={{ height: "250px", width: "100%" }}
    >

      <TileLayer
      // Carga los tiles del mapa desde OpenStreetMap para realizar la imagen del mapa completo
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      
      <ClickMap setPosicion={setPosicion} />
      
      {posicion && (
        <Marker position={posicion}>
          <Popup>Ubicacion de la Publicacion.</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Geolocalizacion;
