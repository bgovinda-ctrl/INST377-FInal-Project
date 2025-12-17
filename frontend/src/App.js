import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import MapPage from "./pages/MapPage";
import FilterPage from "./pages/FilterPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import About from "./pages/About";   // <-- ADD THIS
import "./style.css";

function App() {
  const [page, setPage] = useState("map");
  const [earthquakes, setEarthquakes] = useState([]);

  // Fetch earthquake data
  const fetchEarthquakes = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/earthquakes");
      const data = await res.json();
      setEarthquakes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  let content;
  if (page === "map") content = <MapPage earthquakes={earthquakes} />;
  else if (page === "filter") content = <FilterPage />;
  else if (page === "subscribe") content = <SubscriptionPage />;
  else if (page === "about") content = <About />;   // <-- ADD THIS

  return (
    <div>
      <NavBar setPage={setPage} />
      {content}
    </div>
  );
}

export default App;








