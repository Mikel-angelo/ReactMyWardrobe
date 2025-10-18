// Custom React hook for handling all "locations" data logic.
// Responsible for: fetching, storing, and adding wardrobe locations.

import { useState, useEffect } from "react";
import { getLocations, addLocation } from "../utils/api";

export function useLocations() {
  const [locations, setLocations] = useState([]); // all wardrobe sections/shelves
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch locations when app loads ---
  useEffect(() => {
    async function fetchLocations() {
      try {
        const data = await getLocations(); // backend call (GET /locations)
        setLocations(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  // --- Add a new location (POST /locations) ---
  async function handleAddLocation(newLoc) {
    try {
      const added = await addLocation(newLoc);
      setLocations((prev) => [...prev, added]); // append to list
    } catch (err) {
      setError(err);
    }
  }

  // --- Expose state + functions ---
  return {
    locations,          // array of locations
    handleAddLocation,  // function to add new location
    loading,
    error,
  };
}
