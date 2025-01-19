import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Lokasyonları getir
export const getLocations = () => axios.get(`${API_BASE_URL}/locations`);

// Taşımaları getir
export const getTransportations = () =>
  axios.get(`${API_BASE_URL}/transportations`);

// Rota hesapla
export const calculateRoutes = (originId, destinationId) =>
  axios.get(`${API_BASE_URL}/transportations/routes`, {
    params: { originId, destinationId },
  });

// Yeni lokasyon ekle
export const addLocation = (location) =>
  axios.post(`${API_BASE_URL}/locations`, location);

// Yeni taşıma ekle
export const addTransportation = (transportation) =>
  axios.post(`${API_BASE_URL}/transportations`, transportation);
