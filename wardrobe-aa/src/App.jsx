// src/App.jsx
import { useEffect, useState } from "react";
import { sampleItems,sampleLocations } from "./data/sampleData";
import LocationCard from "./components/LocationCard";
import AddLocationForm from "./components/AddLocationForm";
import "./index.css";
import { API_ROUTES } from "./config/api";

export default function App() {
  // create state for items and locations
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);

  // fetch data when component mounts
useEffect(() => {
  const fetchData = async () => {
    try {
      const [locRes, itemRes] = await Promise.all([
        fetch(API_ROUTES.LOCATIONS),
        fetch(API_ROUTES.ITEMS),
      ]);
      const [locData, itemData] = await Promise.all([
        locRes.json(),
        itemRes.json(),
      ]);
      setLocations(locData);
      setItems(itemData);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  fetchData();
}, []);

  async function addLocation(newLocation) {
    try {
      const response = await fetch(API_ROUTES.LOCATIONS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLocation),
      });
      const addedLocation = await response.json();
      setLocations([...locations, addedLocation]); //this is where the state of react is updated
    } catch (error) {
      console.error("Error adding location:", error);
    }
  }

  // Lifted item creation to App so server interaction and state updates
  // are centralized (mirrors how addLocation works)
  async function addItem(newItem) {
    try {
      const response = await fetch(API_ROUTES.ITEMS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const added = await response.json();
      setItems([...items, added]);
    } catch (err) {
      console.error("Error adding item:", err);
    }
  }

  return (
    <div className="app">
      <h1>My Wardrobe Organizer</h1>

      <AddLocationForm
        onAddLocation={addLocation}
      />

      <p>Below are your current wardrobe sections:</p>

      <div className="wardrobe-grid">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            items={items}
            // pass down the centralized handler instead of setItems
            onAddItem={addItem}
          />
        ))}
      </div>

    </div>
  );
}
