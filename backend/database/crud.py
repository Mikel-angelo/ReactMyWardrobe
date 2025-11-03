from sqlalchemy.orm import Session
from . import models, schemas

# ---- ITEMS ----
def get_items(db: Session):
    return db.query(models.Item).all()

def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# ---- LOCATIONS ----
def get_locations(db: Session):
    return db.query(models.Location).all()

def create_location(db: Session, location: schemas.LocationCreate):
    db_loc = models.Location(**location.dict())
    db.add(db_loc)
    db.commit()
    db.refresh(db_loc)
    return db_loc
