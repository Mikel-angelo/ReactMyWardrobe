import { useState, useEffect } from "react";
import { Star } from "lucide-react";

import type {
  Item,
  Category,
  Location,
  ItemCreate,
} from "@/types/index";
import { SEASONS } from "@/types/index";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddItemFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: ItemCreate, editId?: number) => void;
  categories: Category[];
  locations: Location[];
  presetLocationId?: number;
  presetCategoryId?: number;
  editItem?: Item | null;
}

export function AddItemForm({
  open,
  onClose,
  onSubmit,
  categories,
  locations,
  presetLocationId,
  presetCategoryId,
  editItem,
}: AddItemFormProps) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [color, setColor] = useState("");
  const [fit, setFit] = useState("");
  const [brand, setBrand] = useState("");
  const [season, setSeason] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [notes, setNotes] = useState("");
  const [use, setUse] = useState("");

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setCategoryId(String(editItem.category_id));
      setLocationId(
        editItem.location_id ? String(editItem.location_id) : "",
      );
      setColor(editItem.color || "");
      setFit(editItem.fit || "");
      setBrand(editItem.brand || "");
      setSeason(editItem.season || "");
      setRating(editItem.rating || 0);
      setNotes(editItem.notes || "");
      setUse(editItem.tags.map((t) => t.name).join(", "));
    } else {
      setName("");
      setCategoryId(
        presetCategoryId ? String(presetCategoryId) : "",
      );
      setLocationId(
        presetLocationId ? String(presetLocationId) : "",
      );
      setColor("");
      setFit("");
      setBrand("");
      setSeason("");
      setRating(0);
      setNotes("");
      setUse("");
    }
  }, [editItem, presetCategoryId, presetLocationId, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !categoryId) return;

    const tags = use
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const itemData: ItemCreate = {
      name: name.trim(),
      category_id: parseInt(categoryId),
      location_id: locationId
        ? parseInt(locationId)
        : undefined,
      color: color.trim() || undefined,
      fit: fit.trim() || undefined,
      brand: brand.trim() || undefined,
      season: season || undefined,
      rating: rating || undefined,
      notes: notes.trim() || undefined,
      tags,
    };

    onSubmit(itemData, editItem?.id);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-popover">
        <DialogHeader className="border-b border-border pb-3">
          <DialogTitle className="text-base font-medium">
            {editItem ? "Edit Item" : "Add Item"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 py-2">
          <div>
            <label className="label-mono block mb-1">
              Name *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Item name"
              className="h-8"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-mono block mb-1">
                Category *
              </label>
              <Select
                value={categoryId}
                onValueChange={setCategoryId}
                disabled={!!presetCategoryId}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={String(cat.id)}
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="label-mono block mb-1">
                Location
              </label>
              <Select
                value={locationId}
                onValueChange={setLocationId}
                disabled={!!presetLocationId}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {locations.map((loc) => (
                    <SelectItem
                      key={loc.id}
                      value={String(loc.id)}
                    >
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-mono block mb-1">
                Color
              </label>
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Navy"
                className="h-8"
              />
            </div>
            <div>
                <label className="label-mono block mb-1">
                Fit
                </label>

                <div className="flex flex-wrap gap-1">

                {["tight", "slim", "regular", "loose", "baggy"].map((option) => (
                    <button
                    key={option}
                    type="button"
                    onClick={() => setFit(option)}
                    className={`
                        h-8 px-2 rounded-md text-xs capitalize
                        border transition-colors
                        ${
                        fit === option
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground border-border hover:bg-muted"
                        }
                    `}
                    >
                    {option}
                    </button>
                ))}
                </div>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-mono block mb-1">
                Brand
              </label>
              <Input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Nike"
                className="h-8"
              />
            </div>
            <div>
              <label className="label-mono block mb-1">
                Season
              </label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {SEASONS.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="capitalize"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="label-mono block mb-1">
              Use (comma-separated)
            </label>
            <Input
              value={use}
              onChange={(e) => setUse(e.target.value)}
              placeholder="e.g. gym, work, casual"
              className="h-8"
            />
          </div>

          <div>
            <label className="label-mono block mb-1">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setRating(star === rating ? 0 : star)
                  }
                  className="p-0.5 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating
                        ? "fill-warning text-warning"
                        : "text-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label-mono block mb-1">
              Notes
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
              disabled={!name.trim() || !categoryId}
            >
              {editItem ? "Save" : "Add Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
