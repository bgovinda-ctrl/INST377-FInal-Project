import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";

export default function MapPage() {
  const mapRef = useRef(null);
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/earthquakes");
        const data = await res.json();
        setEarthquakes(data);

        // If map already exists, remove it
        if (mapRef.current) {
          mapRef.current.remove();
        }

        // Initialize map
        const map = L.map("map").setView([20, 0], 2);
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        // Add markers
        data.forEach((eq) => {
          if (eq.coordinates && eq.coordinates.length >= 2) {
            const lat = eq.coordinates[1];
            const lon = eq.coordinates[0];
            L.marker([lat, lon])
              .bindPopup(
                `${eq.place} — Magnitude: ${eq.magnitude} — ${new Date(
                  eq.time
                ).toLocaleString()}`
              )
              .addTo(map);
          }
        });
      } catch (err) {
        console.error(err);
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
            <strong>{eq.place}</strong> — Magnitude: {eq.magnitude} — Time:{" "}
            {new Date(eq.time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}





