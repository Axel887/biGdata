'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Définir des icônes personnalisées pour Leaflet
const crimeIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const CrimeMapStatic = () => {
  const [crimeData, setCrimeData] = useState([]);

  // Effect pour récupérer les données des crimes
  useEffect(() => {
    const fetchCrimeData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/crimes/county');
        const data = await response.json();
        setCrimeData(data);
      } catch (error) {
        console.error('Error fetching crime data:', error);
      }
    };

    fetchCrimeData();
  }, []);

  // Fonction pour obtenir les coordonnées des comtés
  const getCountyCoordinates = (county) => {
    const coordinates = {
      'BRONX': [40.8448, -73.8648],
      'KINGS': [40.6782, -73.9442],
      'NEW YORK': [40.7128, -74.006],
      'QUEENS': [40.7282, -73.7949],
      'RICHMOND': [40.5795, -74.1454],
    };

    return coordinates[county] || [40.7128, -74.006]; // Default to NYC if county not found
  };

  return (
    <div>
      <h2>Carte Statique des Crimes par Comté</h2>
      <MapContainer
        center={[40.7128, -74.006]} // Centrer sur New York
        zoom={10}
        style={{ height: '500px', width: '100%' }}
        scrollWheelZoom={false} // Désactive le zoom avec la molette
        dragging={false} // Désactive le déplacement de la carte
        touchZoom={false} // Désactive le zoom tactile
        zoomControl={false} // Désactive les contrôles de zoom
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {crimeData.map((county, index) => {
          const coordinates = getCountyCoordinates(county.county.toUpperCase()); // Convertir le nom en majuscules
          return (
            <Marker
              key={index}
              position={coordinates}
              icon={crimeIcon}
            >
              <Popup>
                <strong>{county.county}</strong>: {county.crime_count} crimes
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CrimeMapStatic;
