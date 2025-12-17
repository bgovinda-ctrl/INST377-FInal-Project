import React from "react";

export default function About() {
  return React.createElement(
    "div",
    { className: "page-container" },

    React.createElement("h1", null, "About This Application"),

    React.createElement(
      "p",
      null,
      "This application provides real-time earthquake tracking, filtering tools, ",
      "and personalized alert subscriptions using reliable data from the USGS Earthquake API."
    ),

    React.createElement(
      "section",
      null,
      React.createElement("h2", null, "🌍 Data Sources"),
      React.createElement(
        "p",
        null,
        "All earthquake information comes from the USGS Earthquake Hazards Program, updated every minute."
      )
    )
  );
}
