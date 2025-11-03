import { useState } from "react";
import { useItems } from "../hooks/useItems";
import { useLocations } from "../hooks/useLocations";
import LocationCard from "../components/LocationCard";
import AddLocationForm from "../components/AddLocationForm";
import PopupManager from "../components/PopupManager";

export default function WardrobeMode() {
	const { items, handleAddItem } = useItems();
	const { locations, handleAddLocation, loading, error } = useLocations();
	const [showAddLocation, setShowAddLocation] = useState(false);

	if (loading) return <p>Loading wardrobe...</p>;
	if (error) return <p className="text-danger">Error: {error.message}</p>;
	return (
		<div className="max-w-5xl mx-auto px-4">
			<div className="relative flex items-center mt-4">
				<h2 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">Locations</h2>
				<button
					onClick={() => setShowAddLocation(true)}
					className="ml-auto px-3 py-1 rounded-md bg-brand text-white text-sm hover:bg-brand-dark"
				>
					+ Add a Location
				</button>
			</div>

			<PopupManager isOpen={showAddLocation} onClose={() => setShowAddLocation(false)} title="Add New Location">
				<AddLocationForm onAddLocation={handleAddLocation} onClose={() => setShowAddLocation(false)} />
			</PopupManager>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
				{locations.map((loc) => (
					<LocationCard key={loc.id} location={loc} items={items} onAddItem={handleAddItem} />
				))}
			</div>
		</div>
	);
}
