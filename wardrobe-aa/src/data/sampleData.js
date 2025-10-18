// wardrobe-aa/src/data/sampleData.js
// temporary mock data (later replaced by FastAPI)

// Locations represent physical sections in your wardrobe
export const sampleLocations = [
  { id: 1, name: "Top Shelf", description: "Sweaters and hats" },
  { id: 2, name: "Drawer 1", description: "T-shirts and pants" },
  { id: 3, name: "Drawer 2", description: "Underwear and socks" },
];

// Items are the individual clothing pieces
export const sampleItems = [
  { id: 1, name: "Blue Jeans", category: "Pants", season: "All-year", locationId: 2 },
  { id: 2, name: "White Shirt", category: "Top", season: "Summer", locationId: 2 },
  { id: 3, name: "Wool Sweater", category: "Sweater", season: "Winter", locationId: 1 },
];
