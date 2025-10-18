// Centralized API layer for communication between frontend (React)
// and backend (FastAPI). Each function corresponds to a specific endpoint.

import { API_ROUTES } from "../config/api";

// --- LOCATIONS API CALLS ---

// Fetch all locations (GET /locations)
export async function getLocations() {
  const res = await fetch(API_ROUTES.LOCATIONS);
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json();
}

// Add a new location (POST /locations)
export async function addLocation(newLoc) {
  const res = await fetch(API_ROUTES.LOCATIONS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLoc),
  });
  if (!res.ok) throw new Error("Failed to add location");
  return res.json();
}

// --- ITEMS API CALLS ---

// Fetch all items (GET /items)
export async function getItems() {
  const res = await fetch(API_ROUTES.ITEMS);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

// Add a new item (POST /items)
export async function addItem(newItem) {
  const res = await fetch(API_ROUTES.ITEMS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });
  if (!res.ok) throw new Error("Failed to add item");
  return res.json();
}
