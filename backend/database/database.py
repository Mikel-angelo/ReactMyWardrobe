from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from platformdirs import user_data_dir
import os

APP_NAME = "MyWardrobe"
APP_AUTHOR = "MyWardrobe"  # can be same as name

# 1. Resolve OS-specific user data directory
data_dir = user_data_dir(APP_NAME, APP_AUTHOR)

# 2. Ensure directory exists
os.makedirs(data_dir, exist_ok=True)

# 3. Absolute path to DB
db_path = os.path.join(data_dir, "wardrobe.db")

# 4. SQLite URL
DATABASE_URL = f"sqlite:///{db_path}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
