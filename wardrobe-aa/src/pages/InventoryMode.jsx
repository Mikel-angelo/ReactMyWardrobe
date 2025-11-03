import { useItems } from "../hooks/useItems";

export default function InventoryMode(){
	const { items, handleAddItem, loading, error } = useItems();

	return (
		<div>
			<div className="max-w-5xl mx-auto px-4">
				<h3 className="text-lg text-accent font-semibold">Inventory</h3>
				<p className="text-neutral-text mb-4">This page will show inventory details and filters. Placeholder for now.</p>

				{loading ? (
					<div className="text-neutral-muted">Loading items…</div>
				) : error ? (
					<div className="text-danger">Error loading items: {String(error)}</div>
				) : items.length === 0 ? (
					<div className="text-neutral-muted">No items found.</div>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full bg-neutral-bg border border-neutral-muted">
							<thead>
								<tr className="text-left text-sm text-neutral-muted">
									<th className="px-4 py-2 border-b">ID</th>
									<th className="px-4 py-2 border-b">Name</th>
									<th className="px-4 py-2 border-b">Brand</th>
									<th className="px-4 py-2 border-b">Color</th>
									<th className="px-4 py-2 border-b">Size</th>
									<th className="px-4 py-2 border-b">Location</th>
									<th className="px-4 py-2 border-b">Rating</th>
								</tr>
							</thead>
							<tbody>
								{items.map((item) => (
									<tr key={item.id} className="odd:bg-white even:bg-neutral-muted/5">
										<td className="px-4 py-2 border-b">{item.id}</td>
										<td className="px-4 py-2 border-b">{item.name}</td>
										<td className="px-4 py-2 border-b">{item.brand || "—"}</td>
										<td className="px-4 py-2 border-b">{item.color || "—"}</td>
										<td className="px-4 py-2 border-b">{item.size || "—"}</td>
										<td className="px-4 py-2 border-b">{item.location_id ?? "—"}</td>
										<td className="px-4 py-2 border-b">{item.rating ?? "—"}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

			</div>
		</div>
	)
}
