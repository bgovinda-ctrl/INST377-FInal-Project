import React from "react";

export default function NavBar(props) {
  return React.createElement(
    "nav",
    { className: "navbar" },

    React.createElement(
      "button",
      { className: "nav-btn", onClick: () => props.setPage("map") },
      "Map"
    ),
    React.createElement(
      "button",
      { className: "nav-btn", onClick: () => props.setPage("filter") },
      "Filter"
    ),
    React.createElement(
      "button",
      { className: "nav-btn", onClick: () => props.setPage("subscribe") },
      "Subscribe"
    ),
    React.createElement(
      "button",
      { className: "nav-btn", onClick: () => props.setPage("about") },
      "About"
    )
  );
}

