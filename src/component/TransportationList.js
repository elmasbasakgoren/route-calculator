import React, { useState, useEffect } from "react";
import { getLocations, addTransportation, getTransportations, deleteTransportation } from "../services/api";

const TransportationList = () => {
  const [locations, setLocations] = useState([]);
  const [transportations, setTransportations] = useState([]);
  const [newTransportation, setNewTransportation] = useState({
    type: "",
    originId: "",
    destinationId: "",
  });

  // Lokasyon ve Transportation verilerini yükleme
  useEffect(() => {
    fetchLocations();
    fetchTransportations();
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

  const fetchTransportations = async () => {
    try {
      const response = await getTransportations();
      setTransportations(response.data); // Transportation verilerini kaydet
    } catch (error) {
      console.error("Error fetching transportations:", error);
      alert("Failed to fetch transportations.");
    }
  };

  // Yeni Transportation ekleme
  const handleAddTransportation = async (e) => {
    e.preventDefault();
    try {
      await addTransportation(newTransportation);
      alert("Transportation added successfully!");
      setNewTransportation({ type: "", originId: "", destinationId: "" });
      fetchTransportations(); // Yeni veriyi listeye eklemek için yeniden fetch
    } catch (error) {
      console.error("Error adding transportation:", error);
      alert("Failed to add transportation. " + (error.response?.data || "Unknown error"));
    }
  };

  // Transportation silme
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transportation?")) {
      return; // Kullanıcı işlemi iptal etti
    }
    try {
      await deleteTransportation(id);
      alert("Transportation deleted successfully!");
      fetchTransportations(); // Listeyi yeniden yükle
    } catch (error) {
      console.error("Error deleting transportation:", error);
      alert("Failed to delete transportation.");
    }
  };

  // Form inputlarını güncelleme
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransportation({ ...newTransportation, [name]: value });
  };

  return (
    <div>
      <h2>Transportation List</h2>

      {/* Transportation Ekleme Formu */}
      <form onSubmit={handleAddTransportation}>
        <label>
          Type:
          <select
            name="type"
            value={newTransportation.type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Type</option>
            <option value="FLIGHT">Flight</option>
            <option value="BUS">Bus</option>
            <option value="UBER">Uber</option>
            <option value="SUBWAY">Subway</option>
          </select>
        </label>
        <br />
        <label>
          Origin:
          <select
            name="originId"
            value={newTransportation.originId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Origin</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Destination:
          <select
            name="destinationId"
            value={newTransportation.destinationId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Destination</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Add Transportation</button>
      </form>

      {/* Transportation Listesi */}
      <ul>
        {transportations.map((t) => (
          <li key={t.id}>
            {`${t.type} from ${t.origin} to ${t.destination}`}
            <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => handleDelete(t.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransportationList;
