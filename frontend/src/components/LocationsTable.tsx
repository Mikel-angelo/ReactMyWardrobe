import { useState } from "react";
import type { Location } from "@/types";
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
  locations: Location[];
  onDeleteLocation: (id: number) => void;
  onLocationClick?: (location: Location) => void;
};

export function LocationsTable({
  locations,
  onDeleteLocation,
  onLocationClick,
}: Props) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const pendingDelete = locations.find((l) => l.id === deleteId) || null;

  return (
    <div className="border border-border rounded overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="label-mono py-2">Name</TableHead>
            <TableHead className="label-mono py-2">Description</TableHead>
            <TableHead className="label-mono py-2">Notes</TableHead>
            <TableHead className="label-mono py-2 text-right" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {locations.map((location) => (
            <TableRow
              key={location.id}
              className={onLocationClick ? "cursor-pointer hover:bg-muted/30" : ""}
              onClick={() => onLocationClick?.(location)}
            >
              <TableCell className="py-1.5 dense-text">
                {location.name}
              </TableCell>
              <TableCell className="py-1.5 text-muted-foreground max-w-[240px] truncate">
                {location.description || "--"}
              </TableCell>
              <TableCell className="py-1.5 text-muted-foreground max-w-[240px] truncate">
                {location.comments || "--"}
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
                    onClick={() => setDeleteId(location.id)}
                  >
                    <Trash className="w-3 h-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {locations.length === 0 && (
        <div className="py-6 text-center text-sm text-muted-foreground">
          No locations yet.
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-popover">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">
              Delete location?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              {pendingDelete
                ? `This will delete "${pendingDelete.name}". If items exist in this location, deletion may fail.`
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
                if (deleteId !== null) onDeleteLocation(deleteId);
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
