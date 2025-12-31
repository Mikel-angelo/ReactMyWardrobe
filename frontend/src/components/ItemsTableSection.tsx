import { ItemsTable } from "@/components/ItemsTable";
import type { ItemsTableProps } from "@/components/ItemsTable";
import { ItemsTableToolbar } from "@/components/ItemsTableToolbar";
import { useInventoryItemsTable } from "@/hooks/useItemsTable";

export function ItemsTableSection(props: ItemsTableProps) {
  const { items, categories, locations, ...rest } = props;
  const table = useInventoryItemsTable(items, categories, locations);

  return (
    <section>
      <ItemsTableToolbar
        filters={table.filters}
        hasActiveFilters={table.hasActiveFilters}
        allUses={table.allUses}
        categories={categories}
        locations={locations}
        totalCount={items.length}
        visibleCount={table.items.length}
        setSearch={(v) =>
          table.setFilters((prev) => ({ ...prev, search: v }))
        }
        setCategory={(v) =>
          table.setFilters((prev) => ({ ...prev, category: v }))
        }
        setLocation={(v) =>
          table.setFilters((prev) => ({ ...prev, location: v }))
        }
        setSeason={(v) =>
          table.setFilters((prev) => ({ ...prev, season: v }))
        }
        toggleUse={table.toggleUseFilter}
        setColor={(v) =>
          table.setFilters((prev) => ({ ...prev, color: v }))
        }
        setFit={(v) =>
          table.setFilters((prev) => ({ ...prev, fit: v }))
        }
        setRating={(v) =>
          table.setFilters((prev) => ({ ...prev, rating: v }))
        }
        clearFilters={table.clearFilters}
        allColors={table.allColors}
        allFits={table.allFits}
        allRatings={table.allRatings}
      />
      <div className="h-2" />
      <ItemsTable
        {...rest}
        items={table.items}
        categories={categories}
        locations={locations}
        sortField={table.sortField}
        sortDirection={table.sortDirection}
        onSort={table.handleSort}
      />
    </section>
  );
}
