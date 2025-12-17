// routes/earthquakes.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    );
    const data = await response.json();

    // Map USGS GeoJSON to simpler format
    const earthquakes = data.features.map((eq) => ({
      id: eq.id,
      place: eq.properties.place,
      magnitude: eq.properties.mag,
      time: eq.properties.time,
      url: eq.properties.url,
      latitude: eq.geometry.coordinates[1],
      longitude: eq.geometry.coordinates[0],
    }));

    res.json(earthquakes);
  } catch (err) {
    console.error("Error fetching earthquake data:", err);
    res.status(500).json({ error: "Failed to fetch earthquake data" });
  }
});

export default router;







