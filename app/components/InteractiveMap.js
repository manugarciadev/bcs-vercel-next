"use client"; // Marcar o componente como cliente

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuração do ícone do marcador para usar imagem personalizada via link
const customIcon = new L.Icon({
  iconUrl: 'https://cdn.iconscout.com/icon/free/png-512/free-pin-icon-download-in-svg-png-gif-file-formats--locate-marker-location-navigation-user-needs-pack-interface-icons-32419.png?f=webp&w=256', // Substitua pelo link da sua imagem
  iconSize: [42, 42], // Tamanho do ícone
  iconAnchor: [21, 42], // Âncora do ícone (ponto que estará posicionado na coordenada)
  popupAnchor: [0, -42], // Posição do popup em relação ao ícone
  shadowUrl: '', // Substitua pelo link da sua sombra, se desejar
  shadowSize: [41, 41], // Tamanho da sombra
});

const CenterMapOnUpdate = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView(location, map.getZoom());
    }
  }, [location, map]);

  return null;
};

const InteractiveMap = ({ locations }) => {
  // Coordenadas de Santiago, Cabo Verde
  const initialPosition = [14.940874,-23.513058];
  const lastLocation = locations.length ? locations[locations.length - 1].coordinates : initialPosition;

  return (
    <div className="w-full h-96">
      <MapContainer center={initialPosition} zoom={12} scrollWheelZoom={false} className="h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Exibir marcadores personalizados e popups */}
        {locations.map((location) => (
          <Marker key={location.id} position={location.coordinates} icon={customIcon}>
            <Popup>{location.title}</Popup>
          </Marker>
        ))}

        {/* Conectar as localizações com uma linha */}
        <Polyline positions={locations.map(location => location.coordinates)} color="blue" />

        {/* Centralizar o mapa na última localização */}
        <CenterMapOnUpdate location={lastLocation} />
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
