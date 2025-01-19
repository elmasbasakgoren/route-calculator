import React, { useState } from "react";
import { calculateRoutes } from "../services/api";

const RouteCalculator = () => {
  const [originId, setOriginId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [routes, setRoutes] = useState([]);

  const handleCalculate = () => {
    calculateRoutes(originId, destinationId).then((res) => setRoutes(res.data));
  };

  return (
    <div>
      <h2>Route Calculator</h2>
      <input
        type="number"
        placeholder="Origin ID"
        onChange={(e) => setOriginId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Destination ID"
        onChange={(e) => setDestinationId(e.target.value)}
      />
      <button onClick={handleCalculate}>Calculate</button>
      <ul>
        {routes.map((route, idx) => (
          <li key={idx}>
            {route
              .map(
                (r) => `${r.type} from ${r.origin.name} to ${r.destination.name}`
              )
              .join(" ➡ ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteCalculator;
