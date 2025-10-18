// form to add an  item
import { useState } from "react";
import { API_ROUTES } from "../config/api";


function AddItemForm({ locationId, onAddItem, onClose }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [season, setSeason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      name,
      category,
      season,
      locationId,
    };

    // delegate server call and state update to parent
    try {
      await onAddItem(newItem);
      onClose();
    } catch (err) {
      console.error("Error adding item via parent handler:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Season"
        value={season}
        onChange={(e) => setSeason(e.target.value)}
      />
      <div className="popup-buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onClose} className="cancel">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddItemForm;
