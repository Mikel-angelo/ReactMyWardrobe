from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
    DateTime,
    Table,
    Float,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.database.database import Base

# --- association table (pure join table) ---
item_tags = Table(
    "item_tags",
    Base.metadata,
    Column(
        "item_id",
        ForeignKey("items.id", ondelete="CASCADE"),
        primary_key=True,
    ),
    Column(
        "tag_id",
        ForeignKey("tags.id", ondelete="CASCADE"),
        primary_key=True,
    ),
)

# --- Tag ---
class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)

    items = relationship(
        "Item",
        secondary=item_tags,
        back_populates="tags",
    )

# --- Category ---
class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    comments = Column(String, nullable=True)

    items = relationship("Item", back_populates="category")

# --- Location ---
class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    comments = Column(String, nullable=True)

    # optional spatial metadata
    width = Column(Float, nullable=True)
    height = Column(Float, nullable=True)
    grid_x = Column(Integer, nullable=True)
    grid_y = Column(Integer, nullable=True)

    items = relationship("Item", back_populates="location")

# --- Item ---
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)

    # core identity
    name = Column(String, nullable=False)

    # descriptive
    color = Column(String, nullable=True)
    fit = Column(String, nullable=True)
    brand = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    season = Column(String, nullable=True)  # e.g., summer, winter

    # preference
    rating = Column(Integer, nullable=True)  # 1–5 stars

    # relations
    category_id = Column(
        Integer,
        ForeignKey("categories.id", ondelete="RESTRICT"),
        nullable=False,
    )
    location_id = Column(
        Integer,
        ForeignKey("locations.id", ondelete="SET NULL"),
        nullable=True,
    )

    category = relationship("Category", back_populates="items")
    location = relationship("Location", back_populates="items")

    # media
    image_url = Column(String, nullable=True)

    # metadata
    created_at = Column(
        DateTime,
        server_default=func.now(),
        nullable=False,
    )

    # tags (use-context only)
    tags = relationship(
        "Tag",
        secondary=item_tags,
        back_populates="items",
    )

class AppMeta(Base):
    __tablename__ = "app_meta"

    key = Column(String, primary_key=True)
    value = Column(String)
