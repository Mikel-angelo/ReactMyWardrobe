from .database import engine, Base
from . import models
from sqlalchemy import inspect

print("Running init_db...")

print("Creating all tables...")
Base.metadata.create_all(bind=engine)

inspector = inspect(engine)
print("Tables created:", inspector.get_table_names())
