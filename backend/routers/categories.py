from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from backend.database.database import get_db
from backend.database import schemas, crud

router = APIRouter(
    prefix="/categories",
    tags=["categories"],
)


@router.get("/", response_model=list[schemas.CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return crud.get_categories(db)


@router.post("/", response_model=schemas.CategoryOut)
def add_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_category(db, category)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Category with this name already exists",
        )
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Failed to create category",
        )


@router.put("/{category_id}", response_model=schemas.CategoryOut)
def update_category(category_id: int, payload: schemas.CategoryUpdate, db: Session = Depends(get_db)):
    try:
        updated = crud.update_category(db=db, category_id=category_id, payload=payload)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Invalid category data (constraint violation)",
        )
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Failed to update category",
        )

    if updated is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )
    return updated


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    try:
        deleted = crud.delete_category(db=db, category_id=category_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    if deleted is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )
    return None
