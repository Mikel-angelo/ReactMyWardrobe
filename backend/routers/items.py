from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import crud, schemas
from backend.database.database import get_db

router = APIRouter(prefix="/items", tags=["items"])

@router.get("/",response_model=list[schemas.Item])
def get_items(db: Session = Depends(get_db)):
    return crud.get_items(db=db)

@router.post("/", response_model=schemas.Item)
def add_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)
