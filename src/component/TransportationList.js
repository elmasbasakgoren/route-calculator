import React, { useState, useEffect } from "react";
import {
  getTransportations,
  addTransportation,
  deleteTransportation,
  updateTransportation,
  getLocations,
} from "../services/api";

const TransportationList = () => {
  const [transportations, setTransportations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [newTransportation, setNewTransportation] = useState({
    type: "",
    originId: "",
    destinationId: "",
  });
  const [editTransportation, setEditTransportation] = useState(null); // Güncellenmekte olan transportation
  const [showEditModal, setShowEditModal] = useState(false); // Modal görünürlüğü

  useEffect(() => {
    fetchTransportations();
    fetchLocations();
  }, []);

  // Transportation verilerini al
  const fetchTransportations = async () => {
    try {
      const response = await getTransportations();
      setTransportations(response.data);
    } catch (error) {
      console.error("Error fetching transportations:", error);
      alert("Failed to fetch transportations.");
    }
  };

  // Lokasyon verilerini al
  const fetchLocations = async () => {
    try {
      const response = await getLocations();
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      alert("Failed to fetch locations.");
    }
  };

  // Yeni transportation ekle
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

  // Transportation sil
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

  // Transportation düzenleme modalını aç
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

  // Modalı kapat
  const closeEditModal = () => {
    setEditTransportation(null);
    setShowEditModal(false);
  };

  // Transportation güncelle
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
    <div>
      <h2>Transportations</h2>

      {/* Transportation Ekleme Formu */}
      <form onSubmit={handleAddTransportation}>
        <select
          name="type"
          value={newTransportation.type}
          onChange={(e) => setNewTransportation({ ...newTransportation, type: e.target.value })}
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
          name="originId"
          value={newTransportation.originId}
          onChange={(e) => setNewTransportation({ ...newTransportation, originId: e.target.value })}
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
          name="destinationId"
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
        <button type="submit">Add Transportation</button>
      </form>

      {/* Transportation Listesi */}
      <ul>
        {transportations.map((t) => (
          <li key={t.id}>
            {`${t.type} from ${t.origin} to ${t.destination}`}
            <button onClick={() => openEditModal(t)}>Edit</button>
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal">
          <h3>Edit Transportation</h3>
          <select
            name="type"
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
            name="originId"
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
            name="destinationId"
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
          <button onClick={handleUpdate}>Save</button>
          <button onClick={closeEditModal}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TransportationList;
