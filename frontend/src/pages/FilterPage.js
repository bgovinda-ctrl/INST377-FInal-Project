import React, { useEffect, useState } from "react";

export default function FilterPage() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  const fetchEarthquakes = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/earthquakes");
      let data = await res.json();
      setEarthquakes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const applyFilter = () => {
    fetch("http://localhost:3001/api/earthquakes")
      .then((res) => res.json())
      .then((data) => {
        let filtered = data;
        if (country) filtered = filtered.filter((eq) => eq.place.toLowerCase().includes(country.toLowerCase()));
        if (year) filtered = filtered.filter((eq) => new Date(eq.time).getFullYear() === parseInt(year));
        setEarthquakes(filtered);
      });
  };

  // Years dropdown (last 5 years)
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= currentYear - 5; y--) years.push(y);

  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Filter Earthquakes"),
    React.createElement(
      "div",
      { className: "filters" },
      React.createElement(
        "label",
        null,
        "Country:"
      ),
      React.createElement(
        "select",
        { value: country, onChange: (e) => setCountry(e.target.value) },
        React.createElement("option", { value: "" }, "-- All Countries --"),
        React.createElement("option", { value: "Alaska" }, "Alaska"),
        React.createElement("option", { value: "California" }, "California"),
        React.createElement("option", { value: "Japan" }, "Japan"),
        React.createElement("option", { value: "Indonesia" }, "Indonesia"),
        React.createElement("option", { value: "Chile" }, "Chile"),
        React.createElement("option", { value: "Mexico" }, "Mexico"),
        React.createElement("option", { value: "Turkey" }, "Turkey")
      ),
      React.createElement(
        "label",
        null,
        "Year:"
      ),
      React.createElement(
        "select",
        { value: year, onChange: (e) => setYear(e.target.value) },
        React.createElement("option", { value: "" }, "-- All Years --"),
        years.map((y) => React.createElement("option", { key: y, value: y }, y))
      ),
      React.createElement(
        "button",
        { onClick: applyFilter },
        "Apply Filter"
      )
    ),
    React.createElement(
      "ul",
      null,
      earthquakes.map((eq, idx) => {
        const date = new Date(eq.time);
        return React.createElement("li", { key: idx }, `${eq.place} — Magnitude: ${eq.magnitude} — Time: ${date.toLocaleString()}`);
      })
    )
  );
}
