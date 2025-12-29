# ReactMyWardrobe

A small fullstack demo project: a React frontend (Vite) and a FastAPI backend.

This README explains how to run both parts locally on Windows (PowerShell). The repository layout:

```
/backend       - FastAPI app, SQLAlchemy models
/wardrobe-aa   - React (Vite) frontend
README.md
```

Prerequisites
- Python 3.10+ (recommended)
- Node.js 16+ and npm
- PostgreSQL running (optional; you can use SQLite by changing the DB URL)

Backend (FastAPI)
1. Create and activate a virtual environment (run from project root):

```powershell
python -m venv backend\venv
& .\backend\venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -r backend\requirements.txt
```

3. Initialize the database (optional):

```powershell
python -m backend.database.init_db
```

4. Start the backend server (from project root):

```powershell
.\backend\venv\Scripts\Activate.ps1
uvicorn backend.main:app --reload
# or, if you prefer to run from the backend folder:
# cd backend; & .\venv\Scripts\Activate.ps1; uvicorn main:app --reload
```

The API will be available at http://127.0.0.1:8000 and OpenAPI at http://127.0.0.1:8000/docs

Frontend (React/Vite)
1. Change to the frontend folder and install dependencies:

```powershell
cd frontend
npm install
```

2. Start the dev server:

```powershell
npm run dev
```

The frontend server will usually run at http://localhost:5173 (see the terminal output).

Using Tailwind CSS
------------------
This project can use Tailwind CSS in the frontend. I added the Tailwind and PostCSS config files under `wardrobe-aa/` but you still need to install the packages.

From the `wardrobe-aa` folder run:

```powershell
npm install -D tailwindcss postcss autoprefixer
# then start dev server
npm run dev
```

Tailwind's directives are already added to `wardrobe-aa/src/styles/index.css` and `tailwind.config.cjs` is configured to scan the `src/` files.

Tips
- If port 8000 is already in use, start uvicorn with a different port: `uvicorn backend.main:app --reload --port 8001` and update `wardrobe-aa/src/config/api.js` accordingly.
- To stop a process listening on a port (Windows PowerShell):

```powershell
Get-NetTCPConnection -LocalPort 8000 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

- Consider creating a `.env` file to store your `DATABASE_URL` and use `python-dotenv` to load it.

