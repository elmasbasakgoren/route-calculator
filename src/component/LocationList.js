import React, { useState, useEffect } from "react";
import { getLocations, addLocation, deleteLocation, updateLocation } from "../services/api";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    country: "",
    city: "",
    locationCode: "",
  });
  const [editLocation, setEditLocation] = useState(null); // Düzenlenecek lokasyon bilgisi
  const [showEditModal, setShowEditModal] = useState(false); // Modal görünürlüğü

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await getLocations();
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();
    try {
      await addLocation(newLocation);
      setNewLocation({ name: "", country: "", city: "", locationCode: "" });
      fetchLocations();
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this location?")) return;
    try {
      await deleteLocation(id);
      fetchLocations();
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateLocation(editLocation.id, editLocation);
      setShowEditModal(false);
      setEditLocation(null);
      fetchLocations();
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const openEditModal = (location) => {
    setEditLocation(location); // Seçilen lokasyon bilgisi
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditLocation(null);
    setShowEditModal(false);
  };

  return (
    <div>
      <h2>Locations</h2>

      {/* Yeni Lokasyon Ekleme */}
      <form onSubmit={handleAddLocation}>
        <input
          type="text"
          name="name"
          value={newLocation.name}
          onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="country"
          value={newLocation.country}
          onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
          placeholder="Country"
          required
        />
        <input
          type="text"
          name="city"
          value={newLocation.city}
          onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
          placeholder="City"
          required
        />
        <input
          type="text"
          name="locationCode"
          value={newLocation.locationCode}
          onChange={(e) => setNewLocation({ ...newLocation, locationCode: e.target.value })}
          placeholder="Location Code"
          required
        />
        <button type="submit">Add Location</button>
      </form>

      {/* Lokasyon Listesi */}
      <ul>
        {locations.map((loc) => (
          <li key={loc.id}>
            {`${loc.name} - ${loc.city}, ${loc.country} (${loc.locationCode})`}
            <button onClick={() => openEditModal(loc)}>Edit</button>
            <button onClick={() => handleDelete(loc.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal">
          <h3>Edit Location</h3>
          <input
            type="text"
            name="name"
            value={editLocation.name}
            onChange={(e) => setEditLocation({ ...editLocation, name: e.target.value })}
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="country"
            value={editLocation.country}
            onChange={(e) => setEditLocation({ ...editLocation, country: e.target.value })}
            placeholder="Country"
            required
          />
          <input
            type="text"
            name="city"
            value={editLocation.city}
            onChange={(e) => setEditLocation({ ...editLocation, city: e.target.value })}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="locationCode"
            value={editLocation.locationCode}
            onChange={(e) => setEditLocation({ ...editLocation, locationCode: e.target.value })}
            placeholder="Location Code"
            required
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={closeEditModal}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default LocationList;
