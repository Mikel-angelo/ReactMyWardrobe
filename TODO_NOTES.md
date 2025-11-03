# Project To-Do Notes

## 1) Make resizable & flexible grid for `WardrobeMode`
- Goal: let users drag and resize location cards; allow the user to choose the number of columns (interactive control, 1–6).
- Implementation notes:
  - Use react-grid-layout (ResponsiveReactGridLayout) + react-resizable; install: `npm i react-grid-layout react-resizable`.
  - Store layout items as objects: { i: string(id), x, y, w, h, minW?, maxW? }.
  - Provide a small UI control (select or number input) in `WardrobeMode` to pick columns (constrain 1..6). Map that value to the `cols` for the lg breakpoint.
  - Normalize or clamp layout items when column count changes (ensure w <= cols and x + w <= cols). Option: scale widths proportionally.
  - Persist layout + columnCount to `localStorage` (or backend per-user if you add auth). Load on mount.
  - Accessibility / UX: keyboard drag handles, touch support, small "reset layout" button and presets (Compact/Default/BigCards).
- Acceptance criteria:
  - Cards are draggable and resizable on desktop & touch.
  - Column control changes grid columns and layout is normalized.
  - Layout persists across reloads.

## 2) Show clickable categories in `LocationCard` -> open popup with items for that category in that location
- Goal: in each location card show category chips/tags. Clicking a category opens a popup listing only items that match the clicked category and that are in the specific location.
- Implementation notes:
  - Data:
    - LocationCard must receive `items` (all items) and `location` as it currently does.
    - Derive categories present at that location (e.g., itemsInLocation -> group by category id/name).
  - UI:
    - Render categories as small clickable chips/buttons under the item list or in the card footer. Style with Tailwind tokens (bg-accent/rounded-full/px-2).
    - On click: open `PopupManager` (reuse) with content showing a list/table of items filtered by category and location.
    - Provide sorting inside the popup (name, rating) and a close button.
  - API (optional enhancement): add an endpoint `GET /items?location_id=<id>&category_id=<id>` for server-side filtering when item lists are large.
- Acceptance criteria:
  - Clicking a category chip opens a popup showing only items that are in both the chosen category and the location.
  - Popup allows viewing item details (optional: open item modal from the list).

## 3) Decide DB columns for Items and Locations (UX-driven)
- Purpose: propose a clean schema (fields, types, required/optional) to support the UI features above and common inventory needs.

### Items (table: `items`)
- id: integer PK (auto-increment)
- name: varchar, required — user-facing label
- description / notes: text, optional — long-form notes
- color: varchar, optional (store hex or name)
- size: varchar, optional
- brand: varchar, optional
- image_url: varchar, optional
- rating: float/decimal, optional (0-5)
- category_id: integer FK -> categories.id, optional
- location_id: integer FK -> locations.id, optional
- width: float, optional — visual width in wardrobe/grid units (if you want per-item physical size)
- height: float, optional
- created_at: timestamp
- updated_at: timestamp
- archived: boolean default false (optional soft-delete)

Indexes / constraints:
- index on `name` for search
- index on `category_id`
- index on `location_id`

### Locations (table: `locations`)
- id: integer PK
- name: varchar, required
- description: text, optional
- width: float, optional — physical size for layout
- height: float, optional
- grid_x: integer optional — default grid position x (if storing layout)
- grid_y: integer optional — default grid position y
- w: integer optional — grid width (w) in units
- h: integer optional — grid height (h) in units
- created_at, updated_at

Indexes:
- index on `name`

### Categories (table: `categories`)
- id, name (unique), created_at

### Notes on normalization & UX
- Keep item ↔ location as FK relation. For faster lookups by location+category add a composite index: `(location_id, category_id)` if you plan to query that often.
- If you will store layout per-location on the frontend, keep grid metadata on the `locations` table (w/h/x/y) OR store a separate `layouts` table per-user to support multiple users and per-device variants.

## Quick API contract suggestions (helpful endpoints)
- GET /items?location_id=&category_id=&q=&limit=&offset=
- POST /items
- GET /locations
- PATCH /locations/:id (to update layout metadata)