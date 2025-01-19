import React from "react";
import LocationList from "./component/LocationList"
import TransportationList from "./component/TransportationList";
import RouteCalculator from "./component/RouteCalculator";

function App() {
  return (
    <div>
      <h1>Route Calculator</h1>
      <LocationList />
      <TransportationList />
      <RouteCalculator />
    </div>
  );
}

export default App;
