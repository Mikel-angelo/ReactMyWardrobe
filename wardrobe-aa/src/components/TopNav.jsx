import React from "react";

function TopNav({ currentPage, onChange }) {
  return (
    <nav className="w-full bg-neutral-bg shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl text-accent font-semibold">👕 My Wardrobe</h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange("wardrobe")}
            aria-pressed={currentPage === "wardrobe"}
            className={`px-3 py-1 rounded-md text-sm font-sans ${currentPage === "wardrobe" ? "bg-brand text-white" : "text-neutral-text hover:bg-neutral-bg"}`}
          >
            Wardrobe
          </button>
          <button
            onClick={() => onChange("inventory")}
            aria-pressed={currentPage === "inventory"}
            className={`px-3 py-1 rounded-md text-sm font-sans ${currentPage === "inventory" ? "bg-brand text-white" : "text-neutral-text hover:bg-neutral-bg"}`}
          >
            Inventory
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
