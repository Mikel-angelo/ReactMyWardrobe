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
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={name}
        placeholder="Add new location (e.g., Top Shelf)"
        onChange={(e) => setName(e.target.value)}
  className="block w-full border border-neutral-muted rounded-md px-3 py-2 text-sm text-neutral-text"
      />

      <input
        type="text"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
  className="block w-full border border-neutral-muted rounded-md px-3 py-2 text-sm text-neutral-text"
      />

      <input
        type="text"
        value={comments}
        placeholder="Comments"
        onChange={(e) => setComments(e.target.value)}
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
