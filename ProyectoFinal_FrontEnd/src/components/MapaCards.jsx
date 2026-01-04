import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapaCards = ({latitud,longitud}) => (
  <MapContainer center={[latitud, longitud]} zoom={13} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[latitud, longitud]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
);

export default MapaCards;