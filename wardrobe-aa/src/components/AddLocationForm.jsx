// Component: AddLocationForm
// Purpose: UI form for adding a new wardrobe location (e.g., "Top Shelf", "Drawer 2").
// It doesn’t know how data is stored — it simply calls the parent’s onAddLocation() handler.

import { useState } from "react";

export default function AddLocationForm({ onAddLocation, onClose }) {
  // Local state for the input field value
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");

  // --- Handle form submission ---
  async function handleSubmit(e) {
    e.preventDefault(); // prevent page reload
    if (!name.trim()) return; // ignore empty submissions

    // Construct the new location object
    const newLocation = { name, description, comments };

    // Call the parent’s function (which internally calls the hook → API)
    await onAddLocation(newLocation);

    // Clear the input field after adding
    setName("");
    setDescription("");
    setComments("");
    if (onClose) onClose();
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={name}
        placeholder="Add new location (e.g., Top Shelf)"
        onChange={(e) => setName(e.target.value)}
      />

        <input
        type="text"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        value={comments}
        placeholder="Comments"
        onChange={(e) => setComments(e.target.value)}
      />    

      {/* Both buttons inside the same container */}
      <div className="form-buttons">
        <button type="submit" className="submit-btn">Add</button>
        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}
