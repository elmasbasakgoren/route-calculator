import React, { useEffect, useState } from "react";
import { getTransportations, addTransportation } from "../services/api";

const TransportationList = () => {
  const [transportations, setTransportations] = useState([]);
  const [newTransportation, setNewTransportation] = useState({});

  useEffect(() => {
    getTransportations().then((res) => setTransportations(res.data));
  }, []);

  const handleAddTransportation = () => {
    addTransportation(newTransportation).then(() => {
      setNewTransportation({});
      getTransportations().then((res) => setTransportations(res.data));
    });
  };

  return (
    <div>
      <h2>Transportations</h2>
      <ul>
        {transportations.map((t) => (
          <li key={t.id}>
            {t.type} from {t.origin.name} to {t.destination.name}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Type"
        onChange={(e) =>
          setNewTransportation({ ...newTransportation, type: e.target.value })
        }
      />
      <button onClick={handleAddTransportation}>Add Transportation</button>
    </div>
  );
};

export default TransportationList;
