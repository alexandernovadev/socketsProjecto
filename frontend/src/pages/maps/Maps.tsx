import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";

interface MarkerData {
  id: number; // Identificador único para cada marcador
  position: LatLngExpression;
  description: string;
}

export const Maps: React.FC = () => {
  // Coordenadas iniciales del mapa (Bogotá)
  const initialPosition: LatLngExpression = [4.711, -74.0721];

  // Estado para almacenar los marcadores
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // Componente para manejar eventos en el mapa
  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click(e) {
        // Al hacer clic en el mapa, agrega un nuevo marcador en la posición del clic
        const newMarker = {
          id: Date.now(), // Usamos el timestamp como un ID único
          position: [e.latlng.lat, e.latlng.lng] as LatLngExpression,
          description: `Marcador en (${e.latlng.lat.toFixed(
            4
          )}, ${e.latlng.lng.toFixed(4)})`,
        };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      },
    });
    return null;
  };

  // Función para actualizar la posición de un marcador al arrastrarlo
  const handleMarkerDragEnd = (event: LeafletMouseEvent, id: number) => {
    const { lat, lng } = event.target.getLatLng();
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === id
          ? { ...marker, position: [lat, lng] as LatLngExpression }
          : marker
      )
    );
  };

  return (
    <MapContainer
      center={initialPosition}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      {/* Capa de mapa base con tiles de OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Controlador de clics para agregar marcadores */}
      <MapClickHandler />

      {/* Renderizar los marcadores dinámicamente */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          draggable={true} // Hacemos que el marcador sea movible
          eventHandlers={{
            dragend: (event: any) => handleMarkerDragEnd(event, marker.id),
          }}
        >
          <Popup>{marker.description}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
