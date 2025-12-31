# ReactMyWardrobe

Fullstack demo: React (Vite) frontend and FastAPI backend.

Repo layout
```
/backend     - FastAPI app, SQLAlchemy models
/frontend    - React/Vite app
README.md
```

Prerequisites
- Python 3.10+
- Node.js 18+ and npm
- SQLite is bundled (`wardrobe.db`). You can point to PostgreSQL via `DATABASE_URL` if desired.

Backend (FastAPI)
1) From project root, create/activate venv
```powershell
python -m venv backend\venv
& .\backend\venv\Scripts\Activate.ps1
```
2) Install deps
```powershell
pip install -r backend\requirements.txt
```
3) Init DB (optional; SQLite file already present)
```powershell
python -m backend.database.init_db
```
4) Run API
```powershell
uvicorn backend.main:app --reload
```
API: http://127.0.0.1:8000 (docs at /docs).

Frontend (React/Vite)
1) Install deps
```powershell
cd frontend
npm install
```
2) Run dev server
```powershell
npm run dev
```
Frontend: typically http://localhost:5173.

Frontend architecture highlights
- Dialog state hooks: `src/hooks/useItemDialogs.ts`, `useLocationDialogs.ts`, `useCategoryDialogs.ts`.
- Items table sorting/filtering: `src/hooks/useItemsTable.ts`, wired in `src/components/ItemsTableSection.tsx` with `ItemsTableToolbar` + `ItemsTable`.
- Wardrobe grid: `src/components/ResizableGrid.tsx` and `src/components/LocationCard.tsx` (top-right “+” adds a category).
- Global dialogs: `src/dialogs/GlobalDialogs.tsx` (render-only; state lives in `App.tsx` via hooks).

Notes
- Tailwind-style utilities; shared UI primitives in `src/components/ui`.
- Toasts: `src/hooks/use-toast.ts`.

