from pydantic import BaseModel
from typing import Optional

class ItemBase(BaseModel):
    name: str
    color: Optional[str] = None
    size: Optional[str] = None
    brand: Optional[str] = None
    notes: Optional[str] = None
    rating: Optional[float] = None
    image_url: Optional[str] = None
    category_id: Optional[int] = None
    location_id: Optional[int] = None

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    class Config:
        orm_mode = True


class LocationBase(BaseModel):
    name: str
    width: Optional[float] = None
    height: Optional[float] = None
    grid_x: Optional[int] = None
    grid_y: Optional[int] = None

class LocationCreate(LocationBase):
    pass

class Location(LocationBase):
    id: int
    class Config:
        orm_mode = True
