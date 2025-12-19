// server.js — Vercel-ready
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const supabase = require("./supabase/client");
const serverless = require("serverless-http");

const app = express();

// ----------------- CORS -----------------
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://inst-377-final-project-geas-ver2.vercel.app",
    "https://inst-377-final-project-geas-ver2-iulnnfc86.vercel.app",
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

// Apply CORS middleware globally
app.use(cors(corsOptions));
app.use(express.json());

// Explicitly handle OPTIONS preflight for all routes
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).send(); // <- HTTP 200 is required for preflight
});

// ----------------- EARTHQUAKE API -----------------
app.get("/api/earthquakes", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    let allEarthquakes = [];

    for (let year = 2020; year <= currentYear; year++) {
      const startTime = `${year}-01-01`;
      const endTime =
        year === currentYear
          ? new Date().toISOString().split("T")[0]
          : `${year}-12-31`;

      const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=3&limit=1000`;

      const response = await fetch(url);
      const data = await response.json();

      const earthquakes = data.features.map((eq) => ({
        id: eq.id,
        place: eq.properties.place,
        magnitude: eq.properties.mag,
        time: eq.properties.time,
        coordinates: eq.geometry.coordinates,
        latitude: eq.geometry.coordinates[1],
        longitude: eq.geometry.coordinates[0],
        depth: eq.geometry.coordinates[2],
      }));

      allEarthquakes = allEarthquakes.concat(earthquakes);
    }

    allEarthquakes = allEarthquakes
      .filter((eq) => eq.magnitude !== null)
      .sort((a, b) => b.magnitude - a.magnitude)
      .slice(0, 300);

    res.json(allEarthquakes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch earthquakes" });
  }
});

// ----------------- SUBSCRIBE ENDPOINT -----------------
app.post("/api/subscriptions/subscribe", async (req, res) => {
  // CORS headers for POST too (in case preflight succeeded but POST fails)
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { email, location, magnitude } = req.body;

  if (!email || !location || magnitude == null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .insert([{ email, location, magnitude }])
      .select();

    if (error) throw error;

    console.log("📩 New subscription saved to Supabase:", data[0]);

    res.json({ message: "Subscription saved successfully!", subscription: data[0] });
  } catch (err) {
    console.error("Supabase insert error:", err);
    res.status(500).json({ message: "Failed to save subscription", error: err.message });
  }
});

// ----------------- VERCEL EXPORT -----------------
module.exports.handler = serverless(app);






