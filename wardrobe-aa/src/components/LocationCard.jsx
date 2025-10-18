import { useState } from "react";
import AddItemForm from "./AddItemForm";
import PopupManager from "./PopupManager";

function LocationCard({ location, items, onAddItem }) {
  const itemsInLocation = items.filter((i) => i.locationId === location.id);
  const [showAddItem, setShowAddItem] = useState(false);

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

      <button onClick={() => setShowAddItem(true)}>+ Add Item</button>

      <PopupManager isOpen={showAddItem} onClose={()=>setShowAddItem(false)}  title={`Add Item to ${location.name}`}>
        <AddItemForm 
          locationId={location.id}
          onAddItem={onAddItem}
          onClose={() => setShowAddItem(false)}
        />
      </PopupManager>
    
    </div>
  );
}

export default LocationCard;
