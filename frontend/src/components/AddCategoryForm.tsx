import { useState } from "react";
import type { Category, CategoryCreate } from "@/types/index";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddCategoryFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (category: CategoryCreate) => void;
  categories: Category[]; // 👈 ADD THIS
}


export function AddCategoryForm({
  open,
  onClose,
  onSubmit,
  categories,
}: AddCategoryFormProps) {
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");

  const normalizedName = name.trim().toLowerCase();

  const alreadyExists = categories.some(
    (c) => c.name.toLowerCase() === normalizedName
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!normalizedName || alreadyExists) return;

    onSubmit({
      name: name.trim(),
      comments: comments.trim() || undefined,
    });

    setName("");
    setComments("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xs bg-popover">
        <DialogHeader className="border-b border-border pb-3">
          <DialogTitle className="text-base font-medium">
            Add Category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 py-2">

          {/* ✅ EXISTING CATEGORIES */}
          {categories.length > 0 && (
            <div>
              <label className="label-mono block mb-1">
                Existing categories
              </label>

              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="px-2 py-1 text-xs rounded-md
                               bg-muted text-muted-foreground
                               border border-border"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* NAME */}
          <div>
            <label className="label-mono block mb-1">Name *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. T-Shirts"
              className="h-8"
              autoFocus
            />
            {alreadyExists && (
              <p className="text-xs text-destructive mt-1">
                Category already exists
              </p>
            )}
          </div>

          {/* COMMENTS */}
          <div>
            <label className="label-mono block mb-1">Comments</label>
            <Input
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Optional notes"
              className="h-8"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="action"
              size="sm"
              disabled={!normalizedName || alreadyExists}
            >
              Add Category
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
