import { useEffect, useState } from "react";
import type { Location, Category, Item } from "@/types";
import { LocationCard } from "@/components/LocationCard";
import { ResizableGrid } from "@/components/ResizableGrid";
import type { GridCardState } from "@/components/ResizableGrid";

interface WardrobeModeProps {
  locations: Location[];
  categories: Category[];
  items: Item[];
  onItemClick: (item: Item) => void;
  onAddItem: (locationId: number, categoryId?: number) => void;
  onLocationClick: (location: Location) => void;
}

const STORAGE_KEY = "wardrobe-grid-layout";

/* ---------- default layout ---------- */
function createDefaultCardState(id: number, index: number): GridCardState {
  return {
    id,
    columnStart: (index % 3) * 4 + 1, // 3 cards per row
    columnSpan: 4,
    heightPx: 300,
  };
}

export function WardrobeMode({
  locations,
  categories,
  items,
  onItemClick,
  onAddItem,
  onLocationClick,
}: WardrobeModeProps) {
  /* ---------- unassigned ---------- */
  const unassignedItems = items.filter((i) => !i.location_id);

  const allCardIds = [
    ...locations.map((l) => l.id),
    ...(unassignedItems.length > 0 ? [-1] : []),
  ];

  /* ---------- layout state ---------- */
  const [cardStates, setCardStates] = useState<GridCardState[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as GridCardState[];
        return allCardIds.map(
          (id, index) =>
            parsed.find((s) => s.id === id) ??
            createDefaultCardState(id, index)
        );
      } catch {
        /* ignore */
      }
    }
    return allCardIds.map((id, index) =>
      createDefaultCardState(id, index)
    );
  });

  /* ---------- keep layout in sync ---------- */
  useEffect(() => {
    setCardStates((prev) =>
      allCardIds.map(
        (id, index) =>
          prev.find((s) => s.id === id) ??
          createDefaultCardState(id, index)
      )
    );
  }, [locations.length, unassignedItems.length]);

  /* ---------- persist ---------- */
  const handleCardStatesChange = (next: GridCardState[]) => {
    setCardStates(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  /* ---------- build cards ---------- */
  const children = cardStates.map((state) => {
    /* ----- unassigned card ----- */
    if (state.id === -1) {
      return (
        <div
          key="unassigned"
          className="border border-dashed border-border rounded bg-card/50 p-3 h-full"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm text-muted-foreground">
              Unassigned
            </span>
            <span className="count-badge">{unassignedItems.length}</span>
          </div>

          <div className="space-y-1">
            {unassignedItems.map((item) => {
              const category = categories.find(
                (c) => c.id === item.category_id
              );

              return (
                <button
                  key={item.id}
                  onClick={() => onItemClick(item)}
                  className="w-full text-left px-2 py-1 text-sm hover:bg-muted/50 rounded flex items-center justify-between"
                >
                  <span className="dense-text">{item.name}</span>
                  {category && (
                    <span className="text-xs text-muted-foreground">
                      {category.name}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    /* ----- normal location card ----- */
    const location = locations.find((l) => l.id === state.id);
    if (!location) return null;

    return (
      <LocationCard
        key={location.id}
        location={location}
        categories={categories}
        items={items}
        onItemClick={onItemClick}
        onAddItem={onAddItem}
        onLocationClick={onLocationClick}
      />
    );
  });

  return (
    <ResizableGrid
      cardStates={cardStates}
      onCardStatesChange={handleCardStatesChange}
    >
      {children}
    </ResizableGrid>
  );
}
