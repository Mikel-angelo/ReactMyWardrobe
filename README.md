# ReactMyWardrobe

ReactMyWardrobe is a local-first desktop wardrobe manager built as a personal project. It focuses on managing clothing items, layouts, and locations with a fast, native-feeling UI.

## Tech Stack
- React + Vite (TypeScript)
- Tauri desktop shell
- FastAPI backend
- SQLite for per-user storage

## Status
🚧 Active development  
Early-stage build; APIs, data models, and UI may change.

## Development Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
python -m venv backend\venv
backend\venv\Scripts\activate
pip install -r backend\requirements.txt
python -m backend.run_backend
```
Or if you want logs in terminal

```bash
python -m venv backend\venv
backend\venv\Scripts\activate
pip install -r backend\requirements.txt
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
```

### Desktop (Tauri)
```bash
cd frontend
npm run tauri dev
```
