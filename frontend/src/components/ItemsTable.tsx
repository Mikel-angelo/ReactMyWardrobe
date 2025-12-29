import { useState } from "react";
import { Star, Trash } from "lucide-react";
import type { Item, Category, Location } from "@/types/index";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  items: Item[];
  categories: Category[];
  locations: Location[];
  onItemClick: (item: Item) => void;
  onDeleteItem: (id: number) => void;
};

export function ItemsTable({
  items,
  categories,
  locations,
  onItemClick,
  onDeleteItem,
}: Props) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const getCategoryName = (id: number) =>
    categories.find((c) => c.id === id)?.name || "—";

  const getLocationName = (id?: number) =>
    id ? locations.find((l) => l.id === id)?.name || "—" : "—";

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

  const pendingDelete = items.find((i) => i.id === deleteId) || null;

  return (
    <div className="border border-border rounded overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="label-mono py-2">Name</TableHead>
            <TableHead className="label-mono py-2">Category</TableHead>
            <TableHead className="label-mono py-2">Color</TableHead>
            <TableHead className="label-mono py-2">Fit</TableHead>
            <TableHead className="label-mono py-2">Brand</TableHead>
            <TableHead className="label-mono py-2">Season</TableHead>
            <TableHead className="label-mono py-2">Location</TableHead>
            <TableHead className="label-mono py-2">Rating</TableHead>
            <TableHead className="label-mono py-2">Use</TableHead>
            <TableHead className="label-mono py-2">Notes</TableHead>
            <TableHead className="label-mono py-2 text-right" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => onItemClick(item)}
              className="cursor-pointer hover:bg-muted/30"
            >
              <TableCell className="py-1.5 font-medium dense-text">
                {item.name}
              </TableCell>

              <TableCell className="py-1.5 dense-text">
                {getCategoryName(item.category_id)}
              </TableCell>

              <TableCell className="py-1.5 dense-text text-muted-foreground">
                {item.color || "—"}
              </TableCell>

              <TableCell className="py-1.5 dense-text text-muted-foreground">
                {item.fit || "—"}
              </TableCell>

              <TableCell className="py-1.5 dense-text text-muted-foreground">
                {item.brand || "—"}
              </TableCell>

              <TableCell className="py-1.5 dense-text text-muted-foreground capitalize">
                {item.season || "—"}
              </TableCell>

              <TableCell className="py-1.5 dense-text">
                {getLocationName(item.location_id)}
              </TableCell>

              <TableCell className="py-1.5">
                {renderRating(item.rating)}
              </TableCell>

              <TableCell className="py-1.5 dense-text text-muted-foreground max-w-[100px] truncate">
                {item.tags.length > 0
                  ? item.tags.map((t) => t.name).join(", ")
                  : "—"}
              </TableCell>

              <TableCell className="py-1.5 dense-text text-muted-foreground max-w-[120px] truncate">
                {item.notes || "—"}
              </TableCell>

              <TableCell
                className="py-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-end">
                  <Button
                    size="xs"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeleteId(item.id)}
                  >
                    <Trash className="w-3 h-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {items.length === 0 && (
        <div className="py-8 text-center text-muted-foreground text-sm">
          No items in inventory
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-popover">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">
              Delete item?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              {pendingDelete
                ? `This will delete "${pendingDelete.name}". This cannot be undone.`
                : "This cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-8 text-sm">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-8 text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteId !== null) onDeleteItem(deleteId);
                setDeleteId(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
