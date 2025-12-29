import type { Location, Category, Item } from "@/types";
import { LocationsGrid } from "@/components/LocationsGrid";
import { LocationCard } from "@/components/LocationCard";
import { computeMinGridSize } from "@/lib/gridSizing";


interface WardrobeModeProps {
  locations: Location[];
  categories: Category[];
  items: Item[];
  onItemClick: (item: Item) => void;
  onAddItem: (locationId: number, categoryId?: number) => void;
  onLocationClick: (location: Location) => void;
}

export function WardrobeMode({
  locations,
  categories,
  items,
  onItemClick,
  onAddItem,
  onLocationClick,
}: WardrobeModeProps) {
  const unassignedItems = items.filter((i) => !i.location_id);

  const locationsWithUnassigned: Location[] = [
    ...locations,
    ...(unassignedItems.length > 0
      ? [{ id: -1, name: "Unassigned" } as Location]
      : []),
  ];

  const cards: Record<number, React.ReactNode> = {};

  /* ---------- normal locations ---------- */
  locations.forEach((location) => {
    cards[location.id] = (
      <LocationCard
        location={location}
        categories={categories}
        items={items}
        onItemClick={onItemClick}
        onAddItem={onAddItem}
        onLocationClick={onLocationClick}
      />
    );
  });

  /* ---------- unassigned card ---------- */
  if (unassignedItems.length > 0) {
    cards[-1] = (
      <div className="border border-dashed border-border rounded bg-card/50 p-3 h-full">
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

  const locationMeta: Record<number, { minH: number; minW: number }> = {};

  locations.forEach((location) => {
    const locationItems = items.filter(
      (i) => i.location_id === location.id
    );

    const categoriesInLocation = categories.filter((c) =>
      locationItems.some((i) => i.category_id === c.id)
    );

    locationMeta[location.id] = computeMinGridSize({
      categoryCount: categoriesInLocation.length,
      itemCount: locationItems.length,
    });
  });

  return (
    <LocationsGrid
      locations={locationsWithUnassigned}
      cards={cards}
      meta={locationMeta}
    />
  );
}
