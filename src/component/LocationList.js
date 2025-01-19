import React, { useEffect, useState } from "react";
import { getLocations, addLocation } from "../services/api";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({});

  useEffect(() => {
    getLocations().then((res) => setLocations(res.data));
  }, []);

  const handleAddLocation = () => {
    addLocation(newLocation).then(() => {
      setNewLocation({});
      getLocations().then((res) => setLocations(res.data));
    });
  };

  return (
    <div>
      <h2>Locations</h2>
      <ul>
        {locations.map((loc) => (
          <li key={loc.id}>{loc.name}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) =>
          setNewLocation({ ...newLocation, name: e.target.value })
        }
      />
      <button onClick={handleAddLocation}>Add Location</button>
    </div>
  );
};

export default LocationList;
