from backend.database.database import engine, SessionLocal
from backend.database import models
from sqlalchemy import inspect

# ---------- SEED DATA ----------

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


def seed_categories(db):
    for name in DEFAULT_CATEGORIES:
        exists = (
            db.query(models.Category)
            .filter(models.Category.name == name)
            .first()
        )
        if not exists:
            db.add(models.Category(name=name))


def init_db():
    print("Running init_db...")

    print("Creating all tables...")
    models.Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    seed_categories(db)

    db.commit()
    db.close()

    inspector = inspect(engine)
    print("Tables created:", inspector.get_table_names())
    print("Categories seeded.")


if __name__ == "__main__":
    init_db()
