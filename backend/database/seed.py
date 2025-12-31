from sqlalchemy.orm import Session

from backend.database.database import SessionLocal
from backend.database.models import Category
from backend.database.models import Location
from backend.database.models import AppMeta


SEED_KEY = "initial_seed_done"

DEFAULT_CATEGORIES = [
    "T-Shirts",
    "Shirts",
    "Polos",
    "Tank Tops",
    "Hoodies",
    "Sweatshirts",
    "Jackets",
    "Pants",
    "Jeans",
    "Shorts",
    "Shoes",
    "Accessories",
]

DEFAULT_LOCATIONS = [
    "Closet",
    "Hanger",
    "Shoe Rack",
]


def seed_database():
    db: Session = SessionLocal()
    try:
        # 1. Check if seed already ran
        if db.get(AppMeta, SEED_KEY):
            return

        # 2. Seed defaults ONCE
        db.add_all([Category(name=name) for name in DEFAULT_CATEGORIES])
        db.add_all([Location(name=name) for name in DEFAULT_LOCATIONS])

        # 3. Mark seed as done
        db.add(AppMeta(key=SEED_KEY, value="true"))

        db.commit()
    finally:
        db.close()
