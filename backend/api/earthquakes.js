// backend/api/earthquakes.js
export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch earthquake data');
    }

    const data = await response.json();

    const earthquakes = data.features.map(eq => ({
      id: eq.id,
      place: eq.properties.place,
      magnitude: eq.properties.mag,
      time: eq.properties.time,
      url: eq.properties.url,
      latitude: eq.geometry.coordinates[1],
      longitude: eq.geometry.coordinates[0],
    }));

    res.status(200).json(earthquakes);
  } catch (err) {
    console.error('Error fetching earthquake data:', err);
    res.status(500).json({ error: err.message });
  }
}


