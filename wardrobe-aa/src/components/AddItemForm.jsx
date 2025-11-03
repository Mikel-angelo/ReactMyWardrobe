// Component: AddItemForm
// Purpose: Form for adding a new item inside a specific wardrobe location.
// It only handles UI logic — backend calls and state updates are delegated to the parent.

import { useState } from "react";

export default function AddItemForm({ location_id, onAddItem, onClose }) {
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
      location_id, // tie the item to a specific location
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

  console.log("AddItemForm rendered for location_id:", location_id);
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
  className="block w-full border border-neutral-muted rounded-md px-3 py-2 text-sm text-neutral-text"
      />

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category (e.g. T-shirt)"
  className="block w-full border border-neutral-muted rounded-md px-3 py-2 text-sm text-neutral-text"
      />

      <input
        type="text"
        value={season}
        onChange={(e) => setSeason(e.target.value)}
        placeholder="Season (e.g. Summer)"
  className="block w-full border border-neutral-muted rounded-md px-3 py-2 text-sm text-neutral-text"
      />

      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
    className="px-3 py-1 rounded-md bg-accent-light font-sans text-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-neutral-text"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 rounded-md bg-brand text-white font-sans text-sm hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </form>
  );
}
