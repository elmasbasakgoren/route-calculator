import React, { useState, useEffect } from "react";
import { getLocations, addLocation, deleteLocation } from "../services/api";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    country: "",
    city: "",
    locationCode: "",
  });

  // Lokasyonları yükleme
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await getLocations();
      setLocations(response.data); // Lokasyonları state'e kaydet
    } catch (error) {
      console.error("Error fetching locations:", error);
      alert("Failed to fetch locations.");
    }
  };

  // Yeni lokasyon ekleme
  const handleAddLocation = async (e) => {
    e.preventDefault();
    try {
      await addLocation(newLocation);
      alert("Location added successfully!");
      setNewLocation({ name: "", country: "", city: "", locationCode: "" });
      fetchLocations(); // Listeyi güncelle
    } catch (error) {
      console.error("Error adding location:", error);
      alert("Failed to add location. " + (error.response?.data || "Unknown error"));
    }
  };

  // Lokasyon silme
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this location?")) {
      return; // Kullanıcı işlemi iptal etti
    }
    try {
      await deleteLocation(id);
      alert("Location deleted successfully!");
      fetchLocations(); // Listeyi güncelle
    } catch (error) {
      console.error("Error deleting location:", error);
      alert("Failed to delete location.");
    }
  };

  // Form girişlerini yönetme
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLocation({ ...newLocation, [name]: value });
  };

  return (
    <div>
      <h2>Locations</h2>

      {/* Lokasyon ekleme formu */}
      <form onSubmit={handleAddLocation}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newLocation.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={newLocation.country}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={newLocation.city}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Location Code:
          <input
            type="text"
            name="locationCode"
            value={newLocation.locationCode}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Location</button>
      </form>

      {/* Lokasyon listesi */}
      <ul>
        {locations.map((loc) => (
          <li key={loc.id}>
            {`${loc.name} - ${loc.city}, ${loc.country} (${loc.locationCode})`}
            <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => handleDelete(loc.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
