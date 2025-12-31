from sqlalchemy.orm import Session

from backend.database.database import SessionLocal
from backend.database.models import Category
from backend.database.models import Location

DEFAULT_CATEGORIES = [
    "T-shirts",
    "Pants",
    "Shoes",
    "Outerwear",
    "Accessories",
]

DEFAULT_LOCATIONS = [
    "Closet",
    "Drawer",
    "Shoe Rack",
]


def seed_database():
    db: Session = SessionLocal()

    try:
        # Seed categories
        if db.query(Category).count() == 0:
            db.add_all([Category(name=name) for name in DEFAULT_CATEGORIES])

        # Seed locations
        if db.query(Location).count() == 0:
            db.add_all([Location(name=name) for name in DEFAULT_LOCATIONS])

        db.commit()

    finally:
        db.close()
