import { useEffect, useState, useRef } from "react";
import type { Category, CategoryUpdate } from "@/types/index";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  category: Category | null;
  itemCount: number;
  open: boolean;
  onClose: () => void;
  onDelete: (category: Category) => void;
  onSubmit: (id: number, data: CategoryUpdate) => void;
};

export function CategoryCard({
  category,
  itemCount,
  open,
  onClose,
  onDelete,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setComments(category.comments || "");
    }
  }, [category, open]);

  if (!category) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(category.id, {
      name: name.trim(),
      comments: comments.trim() || undefined,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-popover">
        <DialogHeader className="border-b border-border pb-3">
          <DialogTitle className="text-base font-medium">
            {category.name}
          </DialogTitle>
          <div className="text-xs text-muted-foreground">
            Items: <span className="count-badge">{itemCount}</span>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 py-3">
          <div>
            <label className="label-mono block mb-1 text-xs uppercase">
              Name *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-8"
              ref={nameInputRef}
              autoFocus
            />
          </div>

          <div>
            <label className="label-mono block mb-1 text-xs uppercase">
              Comments
            </label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-[72px] resize-none"
              placeholder="Notes about this category"
            />
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => setConfirmOpen(true)}
            >
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
                type="submit"
                variant="action"
                size="sm"
                disabled={!name.trim()}
                onClick={onClose}
              >
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="bg-popover">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">
              Delete category?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              This will delete "{category.name}". This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-8 text-sm">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-8 text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                onDelete(category);
                setConfirmOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
