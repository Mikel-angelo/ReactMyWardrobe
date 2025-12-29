import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onAddLocation: () => void;
  onAddCategory: () => void;
  onAddItem: () => void;
  onViewLocations: () => void;
  onViewCategories: () => void;
  onViewItems: () => void;
  stats: {
    locations: number;
    categories: number;
    items: number;
  };
};

export function ActionBar({
  onAddLocation,
  onAddCategory,
  onAddItem,
  onViewLocations,
  onViewCategories,
  onViewItems,
  stats,
}: Props) {
  return (
    <div className="border-b border-border bg-card/50">
      <div className="container py-2 flex items-center gap-2">
        <Button variant="tool" size="xs" onClick={onAddLocation}>
          <Plus className="w-3 h-3" />
          Location
        </Button>

        <Button variant="tool" size="xs" onClick={onAddCategory}>
          <Plus className="w-3 h-3" />
          Category
        </Button>

        <Button variant="tool" size="xs" onClick={onAddItem}>
          <Plus className="w-3 h-3" />
          Item
        </Button>

        <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={onViewLocations}
            className="bg-transparent p-0 border-0 hover:underline underline-offset-2 text-muted-foreground"
          >
            {stats.locations} locations
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={onViewCategories}
            className="bg-transparent p-0 border-0 hover:underline underline-offset-2 text-muted-foreground"
          >
            {stats.categories} categories
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={onViewItems}
            className="bg-transparent p-0 border-0 hover:underline underline-offset-2 text-muted-foreground"
          >
            {stats.items} items
          </button>
        </div>
      </div>
    </div>
  );
}
