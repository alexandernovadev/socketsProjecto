import React, { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { SocketContext } from "../../context/SocketContext";

interface MarkerData {
  id: number; // Identificador único para cada marcador
  position: LatLngExpression;
  description: string;
}

export const Maps: React.FC = () => {
  const { socket } = useContext(SocketContext);

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
        // Enviar el nuevo marcador al servidor para que lo distribuya a otros clientes
        socket.emit("add-marker", newMarker);
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      },
    });
    return null;
  };

  // Función para actualizar la posición de un marcador al arrastrarlo
  const handleMarkerDrag = (event: LeafletMouseEvent, id: number) => {
    const { lat, lng } = event.target.getLatLng();
    const updatedMarker = {
      id,
      position: [lat, lng] as LatLngExpression,
      description: `Marcador en (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
    };

    // Emitir el movimiento del marcador al servidor mientras se mueve
    socket.emit("move-marker", updatedMarker);

    // Actualizar la posición del marcador localmente
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === id ? updatedMarker : marker
      )
    );
  };

  // useEffect para manejar la comunicación con el servidor a través de los sockets
  useEffect(() => {
    // Escuchar los marcadores actuales enviados por el servidor al conectarse
    socket.on("current-markers", (currentMarkers: MarkerData[]) => {
      setMarkers(currentMarkers);
    });

    // Escuchar los nuevos marcadores creados por otros clientes
    socket.on("new-marker", (newMarker: MarkerData) => {
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    });

    // Escuchar los marcadores actualizados por otros clientes
    socket.on("updated-marker", (updatedMarker: MarkerData) => {
      setMarkers((prevMarkers) =>
        prevMarkers.map((marker) =>
          marker.id === updatedMarker.id ? updatedMarker : marker
        )
      );
    });

    // Limpiar los listeners al desmontar el componente
    return () => {
      socket.off("current-markers");
      socket.off("new-marker");
      socket.off("updated-marker");
    };
  }, [socket]);

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
            // Emitir movimiento del marcador en tiempo real
            drag: (event: any) => handleMarkerDrag(event, marker.id),
            // Opción: Mantener el evento dragend para confirmar el final del movimiento
            dragend: (event: any) => handleMarkerDrag(event, marker.id),
          }}
        >
          <Popup>{marker.description}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
