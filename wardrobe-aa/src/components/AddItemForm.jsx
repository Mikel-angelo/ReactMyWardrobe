// Component: AddItemForm
// Purpose: Form for adding a new item inside a specific wardrobe location.
// It only handles UI logic — backend calls and state updates are delegated to the parent.

import { useState } from "react";

export default function AddItemForm({ locationId, onAddItem, onClose }) {
  // Local state for the input fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [season, setSeason] = useState("");

  // --- Handle submit event ---
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return; // basic validation

    // Build the item object to send
    const newItem = {
      name,
      category,
      season,
      locationId, // tie the item to a specific location
    };

    // Trigger the parent’s add handler (→ hook → API)
    await onAddItem(newItem);

    // Clear form fields
    setName("");
    setCategory("");
    setSeason("");

    // Optionally close popup/modal after adding
    if (onClose) onClose();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="add-item-form"
   >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
      />

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category (e.g. T-shirt)"
         />

      <input
        type="text"
        value={season}
        onChange={(e) => setSeason(e.target.value)}
        placeholder="Season (e.g. Summer)"
      />

      <div className="form-buttons">
        <button type="submit" className="submit-btn">Add</button>
        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>

    </form>
  );
}
