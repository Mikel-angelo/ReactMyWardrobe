import { useState } from "react";
import type { LocationCreate } from "@/types/index";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddLocationFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (location: LocationCreate) => void;
}

export function AddLocationForm({
  open,
  onClose,
  onSubmit,
}: AddLocationFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      description: description.trim() || undefined,
      comments: comments.trim() || undefined,
    });

    setName("");
    setDescription("");
    setComments("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-popover">
        <DialogHeader className="border-b border-border pb-3">
          <DialogTitle className="text-base font-medium">
            Add Location
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 py-2">
          <div>
            <label className="label-mono block mb-1">Name *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Top Shelf"
              className="h-8"
              autoFocus
            />
          </div>

          <div>
            <label className="label-mono block mb-1">Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
              className="h-8"
            />
          </div>

          <div>
            <label className="label-mono block mb-1">Comments</label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Additional notes..."
              className="min-h-[60px] resize-none"
            />
          </div>

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
              disabled={!name.trim()}
            >
              Add Location
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
