import React, { useState } from "react";

export default function SubscriptionPage() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      location: e.target.location.value,
      magnitude: parseFloat(e.target.magnitude.value)
    };

    try {
      const res = await fetch("http://localhost:3001/api/subscriptions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Subscription failed");
      setMessage(data.message || "Subscribed successfully!");
      setStatus("success");
      e.target.reset();
    } catch (err) {
      setMessage(err.message);
      setStatus("error");
    }
  };

  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Subscribe for Alerts"),
    React.createElement(
      "div",
      { id: "message", className: status },
      message
    ),
    React.createElement(
      "form",
      { onSubmit: handleSubmit },
      React.createElement("label", { htmlFor: "email" }, "Email:"),
      React.createElement("input", { type: "email", name: "email", required: true }),
      React.createElement("label", { htmlFor: "location" }, "Location:"),
      React.createElement("input", { type: "text", name: "location", required: true }),
      React.createElement("label", { htmlFor: "magnitude" }, "Minimum Magnitude:"),
      React.createElement("input", { type: "number", step: "0.1", min: "0", name: "magnitude", required: true }),
      React.createElement("button", { type: "submit" }, "Subscribe")
    )
  );
}

