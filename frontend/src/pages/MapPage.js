import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icons for production
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function MapPage() {
  const mapRef = useRef(null);
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const res = await fetch(
          "https://inst-377-final-project-backend.vercel.app/api/earthquakes"
        );
        const data = await res.json();
        setEarthquakes(data);

        // Initialize map only once
        if (!mapRef.current) {
          mapRef.current = L.map("map").setView([20, 0], 2);
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
          }).addTo(mapRef.current);
        }

        const map = mapRef.current;

        // Remove old markers
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });

        // Add markers using latitude & longitude
        const latLngs = [];
        data.forEach((eq) => {
          if (eq.latitude != null && eq.longitude != null) {
            L.marker([eq.latitude, eq.longitude])
              .bindPopup(
                `<strong>${eq.place}</strong><br>
                 Magnitude: ${eq.magnitude.toFixed(2)}<br>
                 ${new Date(eq.time).toLocaleString()}<br>
                 <a href="${eq.url}" target="_blank">More info</a>`
              )
              .addTo(map);
            latLngs.push([eq.latitude, eq.longitude]);
          }
        });

        // Fit map to all markers
        if (latLngs.length > 0) {
          map.fitBounds(latLngs);
        }
      } catch (err) {
        console.error("Failed to fetch earthquakes:", err);
      }
    };

    fetchEarthquakes();
  }, []);

  return (
    <div>
      <h1>🌍 Global Earthquake Map</h1>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>

      <h2>Recent Earthquakes</h2>
      <ul>
        {earthquakes.map((eq) => (
          <li key={eq.id}>
            <strong>{eq.place}</strong> — Magnitude: {eq.magnitude.toFixed(2)} —{" "}
            {new Date(eq.time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}






