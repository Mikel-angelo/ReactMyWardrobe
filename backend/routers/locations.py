from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import crud, schemas
from backend.database.database import get_db

router = APIRouter(prefix="/locations", tags=["locations"])

@router.get("/", response_model=list[schemas.Location])
def get_locations(db: Session = Depends(get_db)):
    return crud.get_locations(db)

@router.post("/", response_model=schemas.Location)
def create_location(location: schemas.LocationCreate, db: Session = Depends(get_db)):
    return crud.create_location(db, location)
