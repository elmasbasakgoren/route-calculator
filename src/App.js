import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TransportationList from "./component/TransportationList";
import LocationList from "./component/LocationList";
import RouteCalculator from "./component/RouteCalculator";
import "./App.css"; // CSS dosyası

const App = () => {
  return (
    <Router>
      <div>
        <nav style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px 0" }}>
          <Link to="/locations" className="nav-link">
            Locations
          </Link>
          <Link to="/transportations" className="nav-link">
            Transportations
          </Link>
          <Link to="/routes" className="nav-link">
            Routes
          </Link>
        </nav>

        <Routes>
          <Route path="/locations" element={<LocationList />} />
          <Route path="/transportations" element={<TransportationList />} />
          <Route path="/routes" element={<RouteCalculator />} />
          <Route path="/" element={<h2>Welcome to the Application</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
