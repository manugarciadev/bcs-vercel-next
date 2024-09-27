"use client";
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom icon for the marker
const customIcon = new L.Icon({
  iconUrl: 'https://cdn.iconscout.com/icon/free/png-512/free-pin-icon-download-in-svg-png-gif-file-formats--locate-marker-location-navigation-user-needs-pack-interface-icons-32419.png?f=webp&w=256',
  iconSize: [42, 42],
  iconAnchor: [21, 42],
  popupAnchor: [0, -42],
});

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      const newLatLng = [e.latlng.lat, e.latlng.lng];
      setPosition(newLatLng); // Update the local state
      map.setView(newLatLng, map.getZoom()); // Center the map on the new marker position
    }
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>Selected Location</Popup>
    </Marker>
  );
};

const InteractiveMapSingle = ({ setLocation, initialPosition }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialPosition);

  useEffect(() => {
    setSelectedLocation(initialPosition);
  }, [initialPosition]);

  useEffect(() => {
    setLocation(selectedLocation); // Send the selected location to the parent component
  }, [selectedLocation, setLocation]);

  return (
    <MapContainer
      center={selectedLocation}
      zoom={12}
      scrollWheelZoom={false}
      className="h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={selectedLocation} setPosition={setSelectedLocation} />
    </MapContainer>
  );
};

export default InteractiveMapSingle;
