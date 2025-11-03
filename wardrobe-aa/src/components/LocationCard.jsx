import { useState } from "react";
import AddItemForm from "./AddItemForm";
import PopupManager from "./PopupManager";

function LocationCard({ location, items, onAddItem }) {
  const itemsInLocation = items.filter((i) => i.locationId === location.id);
  const [showAddItem, setShowAddItem] = useState(false);

  return (
  <div className="bg-neutral-bg rounded-lg p-4 shadow hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{location.name}</h3>
          <p className="text-sm text-neutral-text">{location.description}</p>
        </div>
        <button
          onClick={() => setShowAddItem(true)}
    className="ml-2 px-2 py-1 rounded-md bg-brand text-white text-xs font-sans hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed"
        >
          + Add
        </button>
      </div>

  <ul className="mt-3 list-disc pl-5 text-sm text-neutral-text">
        {itemsInLocation.map((item) => (
          <li key={item.id} className="mb-1">
            <span className="font-medium">{item.name}</span>
            <span className="text-neutral-text"> {item.category ? `· ${item.category}` : "(no category)"}</span>
          </li>
        ))}
      </ul>

      <PopupManager isOpen={showAddItem} onClose={() => setShowAddItem(false)} title={`Add Item to ${location.name}`}>
        <AddItemForm location_id={location.id} onAddItem={onAddItem} onClose={() => setShowAddItem(false)} />
      </PopupManager>
    </div>
  );
}

export default LocationCard;
