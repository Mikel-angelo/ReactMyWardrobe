// Main application component.
// Here we combine our custom hooks and render UI components.
// App acts as the "conductor" – it doesn’t handle data logic directly.

import { useState } from "react";
import TopNav from "./components/TopNav";
import WardrobeMode from "./pages/WardrobeMode";
import InventoryMode from "./pages/InventoryMode";
import "./index.css"; // <-- THIS MUST EXIST


export default function App() {
  const [page, setPage] = useState("wardrobe"); // "wardrobe" | "inventory"

  return (
    <div className="min-h-screen flex flex-col bg-neutral-bg">

      <TopNav currentPage={page} onChange={setPage} />

      <main className="flex-1 p-6">
        {page === "wardrobe" ? (
          <WardrobeMode />
        ) : (
          <InventoryMode />
        )}
      </main>
    </div>
  );
}
