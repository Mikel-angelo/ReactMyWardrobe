// Custom React hook for handling all "items" data logic.
// Responsible for: fetching, storing, and adding items.

import { useState, useEffect } from "react";
import { getItems, addItem } from "../utils/api";

export function useItems() {
  // Local state that this hook manages
  const [items, setItems] = useState([]);      // all wardrobe items
  const [loading, setLoading] = useState(true); // loading flag for UX
  const [error, setError] = useState(null);     // store any API errors

  // --- Fetch items when the component using this hook first renders ---
  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getItems(); // call API function (GET /items)
        setItems(data);                // update local state
      } catch (err) {
        setError(err);                 // save error if request fails
      } finally {
        setLoading(false);             // hide loading spinner after done
      }
    }

    fetchItems();
  }, []); // empty dependency array = run once on mount

  // --- Function to add a new item (POST /items) ---
  async function handleAddItem(newItem) {
    try {
      const added = await addItem(newItem);     // backend call
      setItems((prev) => [...prev, added]);     // update local list
    } catch (err) {
      setError(err);
    }
  }

  // --- Return everything that other components need ---
  return {
    items,           // array of items
    handleAddItem,   // function to add new item
    loading,         // loading status
    error,           // error info (if any)
  };
}
