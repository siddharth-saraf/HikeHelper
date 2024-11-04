import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

function Map () {
  const routeLocation = useLocation();
  const { trailData } = routeLocation.state || {};
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (trailData != null) {
      console.log("got trail data: ", trailData);
      setCoordinates(trailData.geometry.coordinates[0].map(([a, b]) => [b, a]));
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    };
  }, [trailData]);

  useEffect(() => {
      if (coordinates != null) {
        setLocation({ latitude: coordinates[0][0], longitude: coordinates[0][1]});
      };
  }, [coordinates]);

  return (
    <div>
      {location.latitude && location.longitude ? (
        <MapContainer center={[location.latitude, location.longitude]} zoom={16} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <CircleMarker center={[location.latitude, location.longitude]} pathOptions={{ color: 'red' }} radius={20}>
            <Popup>You are here</Popup>
          </CircleMarker>
          { trailData ? <Polyline pathOptions={{ color: "red" }} positions={coordinates} /> : <h1>"No trail loaded"</h1>}
        </MapContainer>
      ) : (
        <p>{error ? `Error: ${error}` : "Loading..."}</p>
      )}
    </div>
  );
};

export default Map;