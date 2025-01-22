import React, { useState, useEffect } from "react";
import { getLocations, addLocation, deleteLocation, updateLocation } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    country: "",
    city: "",
    locationCode: "",
  });
  const [editLocation, setEditLocation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    country: "",
    city: "",
    locationCode: "",
  });

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
    setEditLocation(location);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditLocation(null);
    setShowEditModal(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredLocations = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      loc.country.toLowerCase().includes(filters.country.toLowerCase()) &&
      loc.city.toLowerCase().includes(filters.city.toLowerCase()) &&
      loc.locationCode.toLowerCase().includes(filters.locationCode.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Locations</h2>

      {/* Add Location Form */}
      <form className="row g-3 mb-4" onSubmit={handleAddLocation}>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={newLocation.name}
            onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            value={newLocation.country}
            onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={newLocation.city}
            onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Location Code"
            value={newLocation.locationCode}
            onChange={(e) => setNewLocation({ ...newLocation, locationCode: e.target.value })}
            required
          />
        </div>
        <div className="col-md-1">
          <button type="submit" className="btn btn-primary w-100">
            Add
          </button>
        </div>
      </form>

      {/* Locations Table */}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>
              Name
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Filter by Name"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              Country
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Filter by Country"
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              City
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Filter by City"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              Location Code
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Filter by Location Code"
                name="locationCode"
                value={filters.locationCode}
                onChange={handleFilterChange}
              />
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocations.map((loc) => (
            <tr key={loc.id}>
              <td>{loc.name}</td>
              <td>{loc.country}</td>
              <td>{loc.city}</td>
              <td>{loc.locationCode}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openEditModal(loc)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(loc.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Location</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeEditModal}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Name"
                  value={editLocation.name}
                  onChange={(e) =>
                    setEditLocation({ ...editLocation, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Country"
                  value={editLocation.country}
                  onChange={(e) =>
                    setEditLocation({ ...editLocation, country: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="City"
                  value={editLocation.city}
                  onChange={(e) =>
                    setEditLocation({ ...editLocation, city: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location Code"
                  value={editLocation.locationCode}
                  onChange={(e) =>
                    setEditLocation({ ...editLocation, locationCode: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationList;
