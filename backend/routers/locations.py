from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from backend.database import crud, schemas
from backend.database.database import get_db

router = APIRouter(prefix="/locations", tags=["locations"])


@router.get("/", response_model=list[schemas.LocationOut])
def get_locations(db: Session = Depends(get_db)):
    return crud.get_locations(db)


@router.post("/", response_model=schemas.LocationOut)
def create_location(location: schemas.LocationCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_location(db=db, location=location)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Location with this name already exists",
        )
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Failed to create location",
        )


@router.put("/{location_id}", response_model=schemas.LocationOut)
def update_location(location_id: int, payload: schemas.LocationUpdate, db: Session = Depends(get_db)):
    try:
        updated = crud.update_location(db=db, location_id=location_id, payload=payload)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Invalid location data (constraint violation)",
        )
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Failed to update location",
        )

    if updated is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Location not found",
        )
    return updated


@router.delete("/{location_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_location(location_id: int, db: Session = Depends(get_db)):
    try:
        deleted = crud.delete_location(db=db, location_id=location_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    if deleted is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Location not found",
        )
    return None
