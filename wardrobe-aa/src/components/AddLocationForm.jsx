// form to add new drawers/sections

import { useState } from "react";

function AddLocationForm({ onAddLocation }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page reload
        if (name.trim() === "") return; // simple validation

        // create new location object   
        const newLocation = {
            id: Date.now(), // quick unique id
            name: name.trim(),
            description: description.trim(),
        };

        onAddLocation(newLocation); // send new location up to App
        setName(""); // reset form
        setDescription("");
    };

    return (
        <form className="add-location-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Location Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add Location</button>
        </form>
    );
}
export default AddLocationForm;
