import { useEffect, useState } from "react";
import { MapPin, Trash2 } from "lucide-react";
import type { Location, LocationUpdate } from "@/types/index";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  open: boolean;
  location: Location | null;
  itemCount: number;
  onClose: () => void;
  onSubmit: (id: number, data: LocationUpdate) => void;
  onDeleteRequest: (location: Location) => void;
};

export function LocationDetailsDialog({
  open,
  location,
  itemCount,
  onClose,
  onSubmit,
  onDeleteRequest,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (location) {
      setName(location.name || "");
      setDescription(location.description || "");
      setComments(location.comments || "");
    }
  }, [location, open]);

  if (!location) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit(location.id, {
      name: name.trim(),
      description: description.trim() || undefined,
      comments: comments.trim() || undefined,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-popover">
        <DialogHeader className="border-b border-border pb-3">
          <DialogTitle className="text-base font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            {location.name}
          </DialogTitle>
          <div className="text-xs text-muted-foreground">
            Items here: <span className="count-badge">{itemCount}</span>
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
              autoFocus
            />
          </div>

          <div>
            <label className="label-mono block mb-1 text-xs uppercase">
              Description
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-8"
              placeholder="Brief summary of this spot"
            />
          </div>

          <div>
            <label className="label-mono block mb-1 text-xs uppercase">
              Comments / Notes
            </label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-[72px] resize-none"
              placeholder="Access notes, measurements, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground border-t border-border pt-3">
            <div>
              <span className="label-mono block mb-0.5 text-[11px]">Width</span>
              <span>{location.width ?? "—"}</span>
            </div>
            <div>
              <span className="label-mono block mb-0.5 text-[11px]">Height</span>
              <span>{location.height ?? "—"}</span>
            </div>
            <div>
              <span className="label-mono block mb-0.5 text-[11px]">Grid X</span>
              <span>{location.grid_x ?? "—"}</span>
            </div>
            <div>
              <span className="label-mono block mb-0.5 text-[11px]">Grid Y</span>
              <span>{location.grid_y ?? "—"}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => onDeleteRequest(location)}
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
                type="submit"
                variant="action"
                size="sm"
                disabled={!name.trim()}
              >
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
