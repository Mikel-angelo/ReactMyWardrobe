import { useState } from "react";
import AddItemForm from "./AddItemForm";

function LocationCard({ location, items, setItems }) {
  const itemsInLocation = items.filter((i) => i.locationId === location.id);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="location-card">
      <h3>{location.name}</h3>
      <p>{location.description}</p>

      <ul>
        {itemsInLocation.map((item) => (
          <li key={item.id}>
            {item.name} ({item.category || "no category"})
          </li>
        ))}
      </ul>

      <button onClick={() => setIsPopupOpen(true)}>+ Add Item</button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h4>Add Item to {location.name}</h4>
            <AddItemForm
              locationId={location.id}
              items={items}
              setItems={setItems}
              onClose={() => setIsPopupOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationCard;
