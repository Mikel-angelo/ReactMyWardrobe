// src/config/api.js

// Base URL of your FastAPI backend
const API_BASE_URL = "http://127.0.0.1:8000/api";

// Centralized endpoints
export const API_ROUTES = {
  LOCATIONS: `${API_BASE_URL}/locations`,
  ITEMS: `${API_BASE_URL}/items`,
};
