from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers.items import router as items_router
from backend.routers.locations import router as locations_router
from backend.routers.categories import router as categories_router
from backend.routers import categories
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from backend.database.database import engine , Base
from backend.database.seed import seed_database

app = FastAPI()
Base.metadata.create_all(bind=engine)
seed_database()

app.mount("/static", StaticFiles(directory="backend/static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers here
app.include_router(items_router, prefix="/api")
app.include_router(locations_router, prefix="/api")
app.include_router(categories_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "My Wardrobe API is running","See more":"Visit http://localhost:5173/ !"}

# Serve favicon.ico when the browser requests it
@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(os.path.join("backend", "static", "favicon.ico"))
