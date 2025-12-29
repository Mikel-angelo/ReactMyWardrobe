import { useState } from "react";
import type { Category } from "@/types/index";
import { Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  categories: Category[];
  itemCounts: Record<number, number>;
  onDeleteCategory: (id: number) => void;
  onCategoryClick: (category: Category) => void;
};

export function CategoriesTable({
  categories,
  itemCounts,
  onDeleteCategory,
  onCategoryClick,
}: Props) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const pendingDelete = categories.find((c) => c.id === deleteId) || null;

  return (
    <div className="border border-border rounded overflow-hidden">


      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="label-mono py-2">Name</TableHead>
            <TableHead className="label-mono py-2">Items</TableHead>
            <TableHead className="label-mono py-2">Comments</TableHead>
            <TableHead className="label-mono py-2 text-right" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category) => {
            const count = itemCounts[category.id] || 0;

            return (
              <TableRow
                key={category.id}
                className="cursor-pointer hover:bg-muted/30"
                onClick={() => onCategoryClick(category)}
              >
                <TableCell className="py-1.5 dense-text">
                  {category.name}
                </TableCell>
                <TableCell className="py-1.5 text-muted-foreground">
                  {count}
                </TableCell>
                <TableCell className="py-1.5 text-muted-foreground max-w-[200px] truncate">
                  {category.comments || "--"}
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
                      onClick={() => setDeleteId(category.id)}
                    >
                      <Trash className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {categories.length === 0 && (
        <div className="py-6 text-center text-sm text-muted-foreground">
          No categories yet.
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-popover">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">
              Delete category?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              {pendingDelete
                ? `This will delete "${pendingDelete.name}". If items of this category exist, the category cannot be deleted.`
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
                if (deleteId !== null) onDeleteCategory(deleteId);
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
