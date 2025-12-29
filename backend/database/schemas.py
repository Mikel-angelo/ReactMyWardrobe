from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# ---------- TAG ----------
class TagOut(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

# ---------- ITEM ----------

class ItemBase(BaseModel):
    name: str

    # descriptive
    color: Optional[str] = None
    fit: Optional[str] = None
    brand: Optional[str] = None
    notes: Optional[str] = None

    # preference / structure
    rating: Optional[int] = None       # 1–5 stars
    season: Optional[str] = None       # column, NOT tag

    # relations
    category_id: int                   # 🔒 REQUIRED
    location_id: Optional[int] = None

    # media
    image_url: Optional[str] = None

class ItemCreate(ItemBase):
    # INPUT: frontend sends tag NAMES
    tags: List[str] = []

class ItemUpdate(BaseModel):
    name: Optional[str] = None

    color: Optional[str] = None
    fit: Optional[str] = None
    brand: Optional[str] = None
    notes: Optional[str] = None
    season: Optional[str] = None
    rating: Optional[int] = None

    category_id: Optional[int] = None
    location_id: Optional[int] = None

    image_url: Optional[str] = None

    tags: Optional[List[str]] = None

class ItemOut(ItemBase):
    id: int
    created_at: datetime

    # OUTPUT: full tag objects
    tags: List[TagOut]

    class Config:
        from_attributes = True

# ---------- LOCATION ----------
class LocationBase(BaseModel):
    name: str
    description: Optional[str] = None
    comments: Optional[str] = None
    width: Optional[float] = None
    height: Optional[float] = None
    grid_x: Optional[int] = None
    grid_y: Optional[int] = None


class LocationCreate(LocationBase):
    pass

class LocationUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    comments: Optional[str] = None
    width: Optional[float] = None
    height: Optional[float] = None
    grid_x: Optional[int] = None
    grid_y: Optional[int] = None


class LocationOut(LocationBase):
    id: int

    class Config:
        from_attributes = True


# ---------- CATEGORY ----------

class CategoryBase(BaseModel):
    name: str
    comments: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    comments: Optional[str] = None


class CategoryOut(CategoryBase):
    id: int

    class Config:
        from_attributes = True
