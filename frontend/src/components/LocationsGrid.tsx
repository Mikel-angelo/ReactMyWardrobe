import { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import type { Layout } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import type { Location } from "@/types";
import { useContainerWidth } from "@/hooks/useContainerWidth";

interface LocationsGridProps {
  locations: Location[];
  cards: Record<number, React.ReactNode>;
}

const COLS = 12;
const ROW_HEIGHT = 48;
const STORAGE_KEY = "locations-layout";

export function LocationsGrid({ locations, cards }: LocationsGridProps) {
  const [editMode, setEditMode] = useState(false);
  const [layout, setLayout] = useState<Layout[]>([]);

  const { ref, width } = useContainerWidth<HTMLDivElement>();

  /* ---------- INIT ---------- */
  useEffect(() => {
    if (!width) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setLayout(JSON.parse(saved));
      return;
    }

    const initial: Layout[] = locations.map((loc, i) => ({
      i: String(loc.id),
      x: (i * 4) % COLS,
      y: Infinity,

      w: 4,
      h: 6,

      minW: 3,
      minH: 4,
      maxW: COLS,
    }));

    setLayout(initial);
  }, [locations, width]);

  /* ---------- PERSIST ---------- */
  const handleLayoutChange = (next: Layout[]) => {
    setLayout(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <div ref={ref} className="w-full overflow-x-hidden">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setEditMode((v) => !v)}
          className="text-sm px-2 py-1 rounded border border-border hover:bg-muted"
        >
          {editMode ? "Done" : "Edit layout"}
        </button>
      </div>

      <div className="h-[calc(100vh-140px)] overflow-y-auto">
        <GridLayout
          layout={layout}
          cols={COLS}
          rowHeight={ROW_HEIGHT}
          width={width}
          isDraggable={editMode}
          isResizable={editMode}
          preventCollision={!editMode}
          compactType="vertical"
          onLayoutChange={handleLayoutChange}
        >
          {locations.map((loc) => (
            <div key={String(loc.id)} className="h-full">
              {cards[loc.id]}
            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
}
