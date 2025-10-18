// Main application component.
// Here we combine our custom hooks and render UI components.
// App acts as the "conductor" – it doesn’t handle data logic directly.

import { useState } from "react";
import { useItems } from "./hooks/useItems";
import { useLocations } from "./hooks/useLocations";
import LocationCard from "./components/LocationCard";
import AddLocationForm from "./components/AddLocationForm";
import PopupManager from "./components/PopupManager";

export default function App() {
  // Import data + actions from our custom hooks
  const { items, handleAddItem } = useItems();
  const { locations, handleAddLocation, loading, error } = useLocations();
  
   // Local UI state for controlling the modal
  const [showAddLocation, setShowAddLocation] = useState(false);

  // --- Basic UX handling ---
  if (loading) return <p>Loading wardrobe...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  // --- Render UI ---
  return (
    <div className="container">
      <div className="app-header">
      <h1>👕 My Wardrobe</h1>

        {/* Add new wardrobe section button */}
        <button onClick={() => setShowAddLocation(true)}>+ Add Location</button>
      </div>

      {/* The popup itself */}
      <PopupManager isOpen={showAddLocation} onClose={() => setShowAddLocation(false)} title="Add New Location">
        <AddLocationForm
          onAddLocation={handleAddLocation}
          onClose={() => setShowAddLocation(false)} 
        />
      </PopupManager>

      {/* Render one card per location */}
      <div className="wardrobe-grid">
        {locations.map((loc) => (
          <LocationCard
            key={loc.id}
            location={loc}
            items={items}
            onAddItem={handleAddItem}
          />
        ))}
      </div>
    </div>
  );
}
