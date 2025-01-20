import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getLocations = () => axios.get(`${API_BASE_URL}/locations`);

export const getTransportations = () =>
  axios.get(`${API_BASE_URL}/transportations`);

export const calculateRoutes = (originId, destinationId) =>
  axios.get(`${API_BASE_URL}/transportations/routes`, {
    params: { originId, destinationId },
  });

export const addLocation = (location) =>
  axios.post(`${API_BASE_URL}/locations`, location);

export const addTransportation = async (transportation) => {
    return axios.post(`${API_BASE_URL}/transportations`, transportation);
  };

export const deleteLocation = async (id) => {
    return axios.delete(`${API_BASE_URL}/locations/${id}`);
  };

export const deleteTransportation = async (id) => {
    return axios.delete(`${API_BASE_URL}/transportations/${id}`);
  };

export const updateLocation = async (id, updatedLocation) => {
    return axios.put(`${API_BASE_URL}/locations/${id}`, updatedLocation);
  };
  
 export const updateTransportation = async (id, updatedTransportation) => {
    return axios.put(`${API_BASE_URL}/transportations/${id}`, updatedTransportation);
  };
