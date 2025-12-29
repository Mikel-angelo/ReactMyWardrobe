import type { Item, Category, Location } from "@/types/index";

import { CategoriesTable } from "@/components/CategoriesTable";
import { ItemsTable } from "@/components/ItemsTable";

interface InventoryModeProps {
  items: Item[];
  categories: Category[];
  locations: Location[];
  onItemClick: (item: Item) => void;
  view: "items" | "categories";
  onViewChange: (view: "items" | "categories") => void;
  onDeleteItem: (id: number) => void;
  onDeleteCategory: (id: number) => void;
  categoryItemCounts: Record<number, number>;
  onCategoryClick: (category: Category) => void;
}

export function InventoryMode({
  items,
  categories,
  locations,
  onItemClick,
  view,
  onViewChange,
  onDeleteItem,
  onDeleteCategory,
  categoryItemCounts,
  onCategoryClick,
}: InventoryModeProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <div className="inline-flex border border-border rounded-md overflow-hidden">
          <button
            className={`px-3 py-1.5 text-sm ${
              view === "items"
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground hover:bg-muted/50"
            }`}
            onClick={() => onViewChange("items")}
          >
            Items
          </button>
          <button
            className={`px-3 py-1.5 text-sm border-l border-border ${
              view === "categories"
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground hover:bg-muted/50"
            }`}
            onClick={() => onViewChange("categories")}
          >
            Categories
          </button>
        </div>
      </div>

      {view === "categories" ? (
        <CategoriesTable
          categories={categories}
          itemCounts={categoryItemCounts}
          onDeleteCategory={onDeleteCategory}
          onCategoryClick={onCategoryClick}
        />
      ) : (
        <ItemsTable
          items={items}
          categories={categories}
          locations={locations}
          onItemClick={onItemClick}
          onDeleteItem={onDeleteItem}
        />
      )}
    </div>
  );
}
