# React My Wardrobe (frontend)

Vite + React + TypeScript app for managing wardrobe items, locations, and categories.

## Development

```bash
cd frontend
npm install
npm run dev
```

## Dialog/state structure

- Data fetching/mutations live in `src/hooks/useWardrobe.ts`.
- Dialog UI state is split into hooks:
  - Items: `src/hooks/useItemDialogs.ts`
  - Locations: `src/hooks/useLocationDialogs.ts`
  - Categories: `src/hooks/useCategoryDialogs.ts`
- `App.tsx` owns data + mutations, passes dialog hooks to `src/dialogs/GlobalDialogs.tsx`, which only renders dialogs.

## Inventory view

- Table logic (sorting/filtering) in `src/hooks/useItemsTable.ts`.
- UI wiring in `src/components/ItemsTableSection.tsx` with `ItemsTableToolbar` + `ItemsTable`.
- Location and category views live in `src/components/LocationsTable.tsx` and `src/components/CategoriesTable.tsx`.

## Wardrobe view (grid)

- Resizable/drag layout: `src/components/ResizableGrid.tsx`.
- Location cards: `src/components/LocationCard.tsx` (top-right “+” adds a category).

## Styling/notes

- Tailwind-style utility classes; shared UI in `src/components/ui`.
- Toasts via `src/hooks/use-toast.ts`.
