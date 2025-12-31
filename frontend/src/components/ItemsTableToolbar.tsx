import { useState } from "react";
import type { Category, Location } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const SEASONS = ["spring", "summer", "autumn", "winter", "all-year"];

type Props = {
  /* state */
  filters: {
    search: string;
    category: string;
    location: string;
    season: string;
    use: string[];
    color: string;
    fit: string;
    rating: string;
  };
  hasActiveFilters: boolean;
  allUses: string[];
  allColors: string[];
  allFits: string[];
  allRatings: number[];

  /* data */
  categories: Category[];
  locations: Location[];
  totalCount: number;
  visibleCount: number;

  /* intents */
  setSearch: (v: string) => void;
  setCategory: (v: string) => void;
  setLocation: (v: string) => void;
  setSeason: (v: string) => void;
  toggleUse: (use: string) => void;
  setColor: (v: string) => void;
  setFit: (v: string) => void;
  setRating: (v: string) => void;
  clearFilters: () => void;
};

export function ItemsTableToolbar({
  filters,
  hasActiveFilters,
  allUses,
  allColors,
  allFits,
  allRatings,
  categories,
  locations,
  totalCount,
  visibleCount,
  setSearch,
  setCategory,
  setLocation,
  setSeason,
  toggleUse,
  setColor,
  setFit,
  setRating,
  clearFilters,
}: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasAdvancedOptions =
    allRatings.length > 0 || allColors.length > 0 || allFits.length > 0;

  return (
    <div className="space-y-2">
      {/* Filter bar */}
      <div className="p-3 bg-card border border-border rounded space-y-2">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Search */}
          <Input
            placeholder="Search items..."
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 h-8 text-sm"
          />

          {/* Category filter */}
          <Select
            value={filters.category || "all"}
            onValueChange={(val) =>
              setCategory(val === "all" ? "" : val)
            }
          >
            <SelectTrigger className="w-36 h-8 text-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Location filter */}
          <Select
            value={filters.location || "all"}
            onValueChange={(val) =>
              setLocation(val === "all" ? "" : val)
            }
          >
            <SelectTrigger className="w-36 h-8 text-sm">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc.id} value={String(loc.id)}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Season filter */}
          <Select
            value={filters.season || "all"}
            onValueChange={(val) =>
              setSeason(val === "all" ? "" : val)
            }
          >
            <SelectTrigger className="w-32 h-8 text-sm">
              <SelectValue placeholder="Season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Seasons</SelectItem>
              {SEASONS.map((season) => (
                <SelectItem
                  key={season}
                  value={season}
                  className="capitalize"
                >
                  {season}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasAdvancedOptions && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced((s) => !s)}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <Filter className="w-3 h-3 mr-1" />
              {showAdvanced ? "Hide filters" : "More filters"}
            </Button>
          )}

          {/* Clear filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3 mr-1" />
              Clear
            </Button>
          )}

          <div className="flex-1" />

          {/* Results count */}
          <span className="text-xs text-muted-foreground">
            {visibleCount} of {totalCount} items
          </span>
        </div>

        {showAdvanced && hasAdvancedOptions && (
          <div className="flex flex-wrap items-center gap-2 ">
            {allRatings.length > 0 && (
              <Select
                value={filters.rating || "all"}
                onValueChange={(val) =>
                  setRating(val === "all" ? "" : val)
                }
              >
                <SelectTrigger className="w-32 h-8 text-sm">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  {allRatings.map((rating) => (
                    <SelectItem key={rating} value={String(rating)}>
                      {rating} star{rating === 1 ? "" : "s"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {allColors.length > 0 && (
              <Select
                value={filters.color || "all"}
                onValueChange={(val) =>
                  setColor(val === "all" ? "" : val)
                }
              >
                <SelectTrigger className="w-32 h-8 text-sm">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colors</SelectItem>
                  {allColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {allFits.length > 0 && (
              <Select
                value={filters.fit || "all"}
                onValueChange={(val) =>
                  setFit(val === "all" ? "" : val)
                }
              >
                <SelectTrigger className="w-32 h-8 text-sm">
                  <SelectValue placeholder="Fit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fits</SelectItem>
                  {allFits.map((fit) => (
                    <SelectItem key={fit} value={fit}>
                      {fit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </div>

      {/* Use / Tags filter */}
      {allUses.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-1 pd">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Use:
          </span>

          {allUses.map((use) => {
            const active = filters.use.includes(use);

            return (
              <Badge
                key={use}
                variant={active ? "default" : "outline"}
                className={cn(
                  "cursor-pointer text-xs py-0 h-6 transition-colors",
                  active
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-accent"
                )}
                onClick={() => toggleUse(use)}
              >
                {use}
                {active && <X className="w-3 h-3 ml-1" />}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
