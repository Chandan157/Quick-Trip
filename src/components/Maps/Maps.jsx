import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.scss";

const icon = L.icon({
  iconUrl: "/assets/marker-icon.png",
  iconSize: [30, 50],
});

const position = [51.505, -0.09];

function ResetCenterView({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.setView(L.latLng(lat, lon), map.getZoom(), {
        animate: true,
      });
    }
  }, [lat, lon]);

  return null;
}

const Maps = ({ lat, lon }) => {
  const locationSelection = [lat, lon];
  return (
    <div className="leaflet_map_container">
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={false}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "20px",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${process.env.REACT_APP_MAPTILER_KEY}`}
        />
        {lat && lon && (
          <Marker position={locationSelection} icon={icon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
        <ResetCenterView lat={lat} lon={lon} />
      </MapContainer>
    </div>
  );
};

export default Maps;
