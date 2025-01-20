import React, { useState, useEffect } from "react";
import {
  getTransportations,
  addTransportation,
  deleteTransportation,
  updateTransportation,
  getLocations,
} from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const TransportationList = () => {
  const [transportations, setTransportations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [newTransportation, setNewTransportation] = useState({
    type: "",
    originId: "",
    destinationId: "",
  });
  const [editTransportation, setEditTransportation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchTransportations();
    fetchLocations();
  }, []);

  const fetchTransportations = async () => {
    try {
      const response = await getTransportations();
      setTransportations(response.data);
    } catch (error) {
      console.error("Error fetching transportations:", error);
      alert("Failed to fetch transportations.");
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await getLocations();
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      alert("Failed to fetch locations.");
    }
  };

  const handleAddTransportation = async (e) => {
    e.preventDefault();
    try {
      await addTransportation(newTransportation);
      setNewTransportation({ type: "", originId: "", destinationId: "" });
      fetchTransportations();
    } catch (error) {
      console.error("Error adding transportation:", error);
      alert("Failed to add transportation.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transportation?")) return;
    try {
      await deleteTransportation(id);
      fetchTransportations();
    } catch (error) {
      console.error("Error deleting transportation:", error);
      alert("Failed to delete transportation.");
    }
  };

  const openEditModal = (transportation) => {
    const origin = locations.find((loc) => loc.name === transportation.origin);
    const destination = locations.find((loc) => loc.name === transportation.destination);

    setEditTransportation({
      id: transportation.id,
      type: transportation.type,
      originId: origin?.id || "",
      destinationId: destination?.id || "",
    });

    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditTransportation(null);
    setShowEditModal(false);
  };

  const handleUpdate = async () => {
    try {
      await updateTransportation(editTransportation.id, {
        type: editTransportation.type,
        originId: editTransportation.originId,
        destinationId: editTransportation.destinationId,
      });
      setShowEditModal(false);
      setEditTransportation(null);
      fetchTransportations();
    } catch (error) {
      console.error("Error updating transportation:", error);
      alert("Failed to update transportation.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Transportations</h2>

      {/* Add Transportation Form */}
      <form className="row g-3 mb-4 align-items-end" onSubmit={handleAddTransportation}>
        <div className="col-md-3">
          <select
            className="form-select"
            value={newTransportation.type}
            onChange={(e) =>
              setNewTransportation({ ...newTransportation, type: e.target.value })
            }
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="FLIGHT">Flight</option>
            <option value="BUS">Bus</option>
            <option value="UBER">Uber</option>
            <option value="SUBWAY">Subway</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={newTransportation.originId}
            onChange={(e) =>
              setNewTransportation({ ...newTransportation, originId: e.target.value })
            }
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
        <div className="col-md-3">
          <select
            className="form-select"
            value={newTransportation.destinationId}
            onChange={(e) =>
              setNewTransportation({ ...newTransportation, destinationId: e.target.value })
            }
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
        <div className="col-md-3">
          <button type="submit" className="btn btn-primary w-100">
            Add Transportation
          </button>
        </div>
      </form>

      {/* Transportation Table */}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Type</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transportations.map((t) => (
            <tr key={t.id}>
              <td>{t.type}</td>
              <td>{t.origin}</td>
              <td>{t.destination}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openEditModal(t)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(t.id)}
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
                <h5 className="modal-title">Edit Transportation</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeEditModal}
                ></button>
              </div>
              <div className="modal-body">
                <select
                  className="form-select mb-3"
                  value={editTransportation.type}
                  onChange={(e) =>
                    setEditTransportation({ ...editTransportation, type: e.target.value })
                  }
                  required
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="FLIGHT">Flight</option>
                  <option value="BUS">Bus</option>
                  <option value="UBER">Uber</option>
                  <option value="SUBWAY">Subway</option>
                </select>
                <select
                  className="form-select mb-3"
                  value={editTransportation.originId}
                  onChange={(e) =>
                    setEditTransportation({ ...editTransportation, originId: e.target.value })
                  }
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
                <select
                  className="form-select"
                  value={editTransportation.destinationId}
                  onChange={(e) =>
                    setEditTransportation({ ...editTransportation, destinationId: e.target.value })
                  }
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

export default TransportationList;

