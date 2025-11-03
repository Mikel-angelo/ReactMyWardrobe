from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    items = relationship("Item", back_populates="category")

class Location(Base):
    __tablename__ = "locations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    width = Column(Float)
    height = Column(Float)
    grid_x = Column(Integer)
    grid_y = Column(Integer)
    items = relationship("Item", back_populates="location")

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    color = Column(String)
    size = Column(String)
    brand = Column(String)
    notes = Column(String)
    rating = Column(Float)
    image_url = Column(String)
    category_id = Column(Integer, ForeignKey("categories.id"))
    location_id = Column(Integer, ForeignKey("locations.id"))
    category = relationship("Category", back_populates="items")
    location = relationship("Location", back_populates="items")
