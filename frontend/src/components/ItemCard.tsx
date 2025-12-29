import { Edit2, Trash2, Star } from "lucide-react";
import type { Item, Category, Location } from "@/types/index";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: Item | null;
  categories: Category[];
  locations: Location[];
  open: boolean;
  onClose: () => void;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

export function ItemCard({
  item,
  categories,
  locations,
  open,
  onClose,
  onEdit,
  onDelete,
}: ItemCardProps) {
  if (!item) return null;

  const category = categories.find((c) => c.id === item.category_id);
  const location = locations.find((l) => l.id === item.location_id);

  const renderRating = (rating?: number) => {
    if (!rating) return <span className="text-muted-foreground">—</span>;

    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-3 h-3",
              star <= rating ? "fill-warning text-warning" : "text-muted",
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-popover">
        <DialogHeader className="border-b border-border pb-3">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-base font-medium">
                {item.name}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                {category && (
                  <span className="label-mono">{category.name}</span>
                )}
                {location && (
                  <span className="text-xs text-muted-foreground">
                    • {location.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 py-3 text-sm">
          <div>
            <span className="label-mono block mb-0.5">Color</span>
            <span>{item.color || "—"}</span>
          </div>
          <div>
            <span className="label-mono block mb-0.5">Fit</span>
            <span>{item.fit || "—"}</span>
          </div>
          <div>
            <span className="label-mono block mb-0.5">Brand</span>
            <span>{item.brand || "—"}</span>
          </div>
          <div>
            <span className="label-mono block mb-0.5">Season</span>
            <span className="capitalize">
              {item.season || "—"}
            </span>
          </div>
          <div>
            <span className="label-mono block mb-0.5">Rating</span>
            {renderRating(item.rating)}
          </div>
          <div>
            <span className="label-mono block mb-0.5">Use</span>
            <span>
              {item.tags.length > 0
                ? item.tags.map((t) => t.name).join(", ")
                : "—"}
            </span>
          </div>
        </div>

        {item.notes && (
          <div className="border-t border-border pt-3">
            <span className="label-mono block mb-1">Notes</span>
            <p className="text-sm text-muted-foreground">
              {item.notes}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => onDelete(item)}
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="action"
              size="sm"
              onClick={() => onEdit(item)}
            >
              <Edit2 className="w-3 h-3 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
