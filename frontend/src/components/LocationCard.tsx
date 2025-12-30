import { useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import type { Location, Category, Item } from "@/types/index";

interface CategoryGroup {
  category: Category;
  items: Item[];
}

interface LocationCardProps {
  location: Location;
  categories: Category[];
  items: Item[];
  onItemClick: (item: Item) => void;
  onAddItem: (locationId: number, categoryId?: number) => void;
  onLocationClick: (location: Location) => void;
}

export function LocationCard({
  location,
  categories,
  items,
  onItemClick,
  onAddItem,
  onLocationClick,
}: LocationCardProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set(),
  );

  const locationItems = items.filter(
    (item) => item.location_id === location.id,
  );

  const categoryGroups: CategoryGroup[] = categories
    .map((category) => ({
      category,
      items: locationItems.filter(
        (item) => item.category_id === category.id,
      ),
    }))
    .filter((group) => group.items.length > 0);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  // Empty state: no items in this location
  if (categoryGroups.length === 0) {
    return (
      <div className="p-3 h-full">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-2 flex-shrink-0">
          <button
            onClick={() => onLocationClick(location)}
            className="flex-1 text-left font-medium text-sm hover:underline rounded px-1 py-0.5"
          >
            {location.name}
          </button>
          <button
            onClick={() => onAddItem(location.id)}
            className="text-muted-foreground hover:text-foreground p-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">No items</p>
        </div>
      </div>
    );
  }

  return (    
    <div className="h-full flex flex-col">
      {/* HEADER (NEVER SHRINKS) */}
      <div className="flex items-center gap-2 p-3 border-b border-border flex-shrink-0">
        <button
          onClick={() => onLocationClick(location)}
          className="flex-1 text-left font-medium text-sm hover:underline rounded px-1 py-0.5 flex items-center justify-between"
        >
          <span>{location.name}</span>
          <span className="count-badge">{locationItems.length}</span>
        </button>
        <button
          onClick={() => onAddItem(location.id)}
          className="text-muted-foreground hover:text-foreground p-1"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-auto divide-y divide-border">
        {categoryGroups.map(({ category, items: categoryItems }) => {
          const isExpanded = expandedCategories.has(category.id);

          return (
            <div key={category.id}>
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-muted/50 text-left"
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  )}
                  <span className="text-sm">{category.name}</span>
                </div>
                <span className="count-badge">{categoryItems.length}</span>
              </button>

              {isExpanded && (
                <div className="bg-muted/30 border-t border-border">
                  {categoryItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onItemClick(item)}
                      className="w-full text-left px-6 py-1.5 text-sm hover:bg-muted/50 flex items-center justify-between group"
                    >
                      <span className="dense-text">{item.name}</span>
                      {item.color && (
                        <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100">
                          {item.color}
                        </span>
                      )}
                    </button>
                  ))}

                  <button
                    onClick={() => onAddItem(location.id, category.id)}
                    className="w-full text-left px-6 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add in {category.name}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
