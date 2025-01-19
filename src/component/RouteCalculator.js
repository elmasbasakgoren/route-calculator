import React, { useState, useEffect } from "react";
import { getLocations, calculateRoutes } from "../services/api";

const RouteCalculator = () => {
  const [locations, setLocations] = useState([]);
  const [originId, setOriginId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [routes, setRoutes] = useState([]);

  // Lokasyonları backend'den al
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await getLocations();
      setLocations(response.data); // Backend'den gelen lokasyonları kaydet
    } catch (error) {
      console.error("Error fetching locations:", error);
      alert("Failed to fetch locations.");
    }
  };

  const handleCalculate = async () => {
    try {
      const response = await calculateRoutes(originId, destinationId);
      setRoutes(response.data); // Rotaları kaydet
    } catch (error) {
      console.error("Error calculating routes:", error);
      alert("Failed to calculate routes.");
    }
  };

  return (
    <div>
      <h2>Route Calculator</h2>
      <label>
        Origin:
        <select value={originId} onChange={(e) => setOriginId(e.target.value)}>
          <option value="" disabled>Select Origin</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name} {/* Dropdown'da isim gösteriliyor */}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Destination:
        <select
          value={destinationId}
          onChange={(e) => setDestinationId(e.target.value)}
        >
          <option value="" disabled>Select Destination</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name} {/* Dropdown'da isim gösteriliyor */}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={handleCalculate}>Calculate</button>
      <ul>
        {routes.map((route, idx) => (
          <li key={idx}>
            {route
              .map(
                (r) =>
                  `${r.type} from ${r.origin} to ${r.destination}`
              )
              .join(" ➡ ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteCalculator;
