from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from backend.database import crud, schemas
from backend.database.database import get_db

router = APIRouter(prefix="/items", tags=["items"])


@router.get("/", response_model=list[schemas.ItemOut])
def get_items(db: Session = Depends(get_db)):
    return crud.get_items(db=db)


@router.post("/", response_model=schemas.ItemOut)
def add_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_item(db=db, item=item)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Invalid item data (constraint violation)",
        )
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Failed to create item",
        )


@router.put("/{item_id}", response_model=schemas.ItemOut)
def update_item(item_id: int, payload: schemas.ItemUpdate, db: Session = Depends(get_db)):
    try:
        updated = crud.update_item(db=db, item_id=item_id, payload=payload)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Invalid item data (constraint violation)",
        )
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Failed to update item",
        )

    if updated is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found",
        )
    return updated


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_item(db=db, item_id=item_id)
    if deleted is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found",
        )
    return None
