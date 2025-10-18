// form to add an  item
import { useState } from "react";

function AddItemForm({ locationId, items, setItems, onClose }) {
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

    try {
      const res = await fetch("http://127.0.0.1:8000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const added = await res.json();
      setItems([...items, added]);
      onClose(); // close popup
    } catch (err) {
      console.error("Error adding item:", err);
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
