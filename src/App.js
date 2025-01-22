import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LocationList from "./component/LocationList";
import TransportationList from "./component/TransportationList"
import RouteCalculator from "./component/RouteCalculator"

const App = () => {
  const [activePage, setActivePage] = useState("Home");

  const pages = {
    Locations: <LocationList />,
    Transportations: <TransportationList />,
    Routes: <RouteCalculator />,
  };

  return (
    <div className="d-flex vh-100 flex-column">
      {/* Header */}
      <header className="bg-primary text-white text-left py-3">
        <h1>Route Finder App</h1>
      </header>

      <div className="d-flex flex-grow-1">
        {/* Sidebar Navbar */}
        <nav className="bg-light border-right p-3" style={{ width: "250px" }}>
          <ul className="nav flex-column">
            {Object.keys(pages).map((page) => (
              <li key={page} className="nav-item">
                <button
                  className={`nav-link btn btn-link text-start ${activePage === page ? "active text-primary" : ""
                    }`}
                  onClick={() => setActivePage(page)}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1 p-4">
          {pages[activePage]}
        </main>
      </div>
    </div>
  );
};

export default App;
