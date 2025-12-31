import { useMemo, useState } from "react";
import type { Item, Category, Location } from "@/types";

export type SortField =
  | "name"
  | "category"
  | "color"
  | "fit"
  | "brand"
  | "season"
  | "location"
  | "rating";

export type SortDirection = "asc" | "desc" | null;

type Filters = {
  search: string;
  category: string;
  location: string;
  season: string;
  use: string[];
  color: string;
  fit: string;
  rating: string;
};

export function useInventoryItemsTable(
  items: Item[],
  categories: Category[],
  locations: Location[],
) {
  /* ---------------- state ---------------- */

  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(null);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    location: "",
    season: "",
    use: [],
    color: "",
    fit: "",
    rating: "",
  });

  /* ---------------- helpers ---------------- */

  const getCategoryName = (id: number) =>
    categories.find((c) => c.id === id)?.name || "—";

  const getLocationName = (id?: number) =>
    id ? locations.find((l) => l.id === id)?.name || "—" : "—";

  /* ---------------- derived data ---------------- */

  const allUses = useMemo(() => {
    const uses = new Set<string>();
    items.forEach((item) => {
      item.tags.forEach((tag) => uses.add(tag.name));
    });
    return Array.from(uses).sort();
  }, [items]);

  const allColors = useMemo(() => {
    const colors = new Set<string>();
    items.forEach((item) => {
      if (item.color) colors.add(item.color);
    });
    return Array.from(colors).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase()),
    );
  }, [items]);

  const allFits = useMemo(() => {
    const fits = new Set<string>();
    items.forEach((item) => {
      if (item.fit) fits.add(item.fit);
    });
    return Array.from(fits).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase()),
    );
  }, [items]);

  const allRatings = useMemo(() => {
    const ratings = new Set<number>();
    items.forEach((item) => {
      if (typeof item.rating === "number") ratings.add(item.rating);
    });
    return Array.from(ratings).sort((a, b) => a - b);
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const matches =
          item.name.toLowerCase().includes(search) ||
          item.brand?.toLowerCase().includes(search) ||
          item.color?.toLowerCase().includes(search) ||
          item.notes?.toLowerCase().includes(search);
        if (!matches) return false;
      }

      if (
        filters.category &&
        item.category_id !== Number(filters.category)
      ) {
        return false;
      }

      if (filters.location) {
        if (filters.location === "unassigned" && item.location_id)
          return false;
        if (
          filters.location !== "unassigned" &&
          item.location_id !== Number(filters.location)
        )
          return false;
      }

      if (filters.season && item.season !== filters.season) {
        return false;
      }

      if (filters.color) {
        if ((item.color || "").toLowerCase() !== filters.color.toLowerCase()) {
          return false;
        }
      }

      if (filters.fit) {
        if ((item.fit || "").toLowerCase() !== filters.fit.toLowerCase()) {
          return false;
        }
      }

      if (filters.rating) {
        const target = Number(filters.rating);
        if (item.rating !== target) return false;
      }

      if (filters.use.length > 0) {
        const itemTagNames = item.tags.map((t) => t.name);
        const hasAll = filters.use.every((u) =>
          itemTagNames.includes(u),
        );
        if (!hasAll) return false;
      }

      return true;
    });
  }, [items, filters]);

  const sortedItems = useMemo(() => {
    if (!sortField || !sortDirection) return filteredItems;

    return [...filteredItems].sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";

      switch (sortField) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "category":
          aVal = getCategoryName(a.category_id).toLowerCase();
          bVal = getCategoryName(b.category_id).toLowerCase();
          break;
        case "color":
          aVal = (a.color || "").toLowerCase();
          bVal = (b.color || "").toLowerCase();
          break;
        case "fit":
          aVal = (a.fit || "").toLowerCase();
          bVal = (b.fit || "").toLowerCase();
          break;
        case "brand":
          aVal = (a.brand || "").toLowerCase();
          bVal = (b.brand || "").toLowerCase();
          break;
        case "season":
          aVal = a.season || "";
          bVal = b.season || "";
          break;
        case "location":
          aVal = getLocationName(a.location_id).toLowerCase();
          bVal = getLocationName(b.location_id).toLowerCase();
          break;
        case "rating":
          aVal = a.rating || 0;
          bVal = b.rating || 0;
          break;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredItems, sortField, sortDirection]);

  /* ---------------- actions ---------------- */

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") setSortDirection("desc");
      else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleUseFilter = (use: string) => {
    setFilters((prev) => ({
      ...prev,
      use: prev.use.includes(use)
        ? prev.use.filter((u) => u !== use)
        : [...prev.use, use],
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      location: "",
      season: "",
      use: [],
      color: "",
      fit: "",
      rating: "",
    });
  };

  const hasActiveFilters =
    !!filters.search ||
    !!filters.category ||
    !!filters.location ||
    !!filters.season ||
    !!filters.color ||
    !!filters.fit ||
    !!filters.rating ||
    filters.use.length > 0;

  /* ---------------- return ---------------- */

  return {
    items: sortedItems,

    sortField,
    sortDirection,
    filters,
    allUses,
    allColors,
    allFits,
    allRatings,
    hasActiveFilters,

    setFilters,
    handleSort,
    toggleUseFilter,
    clearFilters,
  };
}

export type InventoryItemsTableState = ReturnType<
  typeof useInventoryItemsTable
>;
