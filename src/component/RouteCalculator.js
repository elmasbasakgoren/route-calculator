import React, { useState, useEffect } from "react";
import { getLocations, calculateRoutes } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const RouteCalculator = () => {
  const [locations, setLocations] = useState([]);
  const [originId, setOriginId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await getLocations();
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      alert("Failed to fetch locations.");
    }
  };

  const handleCalculate = async () => {
    setSelectedRoute(null); // Clear the current visualization
    try {
      const response = await calculateRoutes(originId, destinationId);
      setRoutes(response.data);
    } catch (error) {
      console.error("Error calculating routes:", error);
      alert("Failed to calculate routes.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Route Calculator</h2>

      {/* Form */}
      <form className="row g-3 mb-4">
        <div className="col-md-4">
          <label htmlFor="origin" className="form-label">
            Origin
          </label>
          <select
            id="origin"
            className="form-select"
            value={originId}
            onChange={(e) => setOriginId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Origin
            </option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="destination" className="form-label">
            Destination
          </label>
          <select
            id="destination"
            className="form-select"
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Destination
            </option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleCalculate}
          >
            Calculate
          </button>
        </div>
      </form>

      {/* Available Routes */}
      <h3 className="mb-4">Available Routes</h3>
      <div className="row">
        <div className="col-md-6">
          {routes.length === 0 ? (
            <div className="alert alert-warning" role="alert">
              No route available.
            </div>
          ) : (
            <ul className="list-group">
              {routes.map((route, idx) => (
                <li
                  key={idx}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedRoute(route)}
                >                  via {route[0].type}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Visualize Route */}
        <div className="col-md-6">
  {selectedRoute && (
    <div className="p-4 border rounded bg-light">
      <h4>Detailed</h4>
      <div
        className="d-flex flex-wrap align-items-center justify-content-start"
        style={{ lineHeight: "1.5", gap: "10px" }}
      >
        {selectedRoute.map((segment, idx) => (
          <React.Fragment key={idx}>
            <span className="text-primary fw-bold">{segment.origin}</span>
            <span className="mx-2">via {segment.type}</span>
            <span className="mx-2">➡</span>
            {idx === selectedRoute.length - 1 && (
              <span className="mx-2 text-success fw-bold">{segment.destination}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )}
</div>

      </div>
    </div >
  );
};

export default RouteCalculator;

