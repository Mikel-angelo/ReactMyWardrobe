from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from . import models, schemas


# ---------- ITEMS ----------

def get_items(db: Session):
    return db.query(models.Item).all()

def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(
        name=item.name,
        category_id=item.category_id,
        location_id=item.location_id,

        # descriptive
        color=item.color,
        fit=item.fit,
        brand=item.brand,
        notes=item.notes,
        season=item.season,

        # preference
        rating=item.rating,
    )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    # tags: input is List[str] (tag names)
    if item.tags:
        for tag_name in item.tags:
            tag = (
                db.query(models.Tag)
                .filter(models.Tag.name == tag_name)
                .first()
            )
            if not tag:
                tag = models.Tag(name=tag_name)
                db.add(tag)
                db.flush()  # get tag.id without full commit

            if tag not in db_item.tags:
                db_item.tags.append(tag)

        db.commit()
        db.refresh(db_item)

    return db_item

def update_item(db: Session, item_id: int, payload: schemas.ItemUpdate):
    db_item = db.get(models.Item, item_id)
    if not db_item:
        return None

    for field in [
        "name",
        "color",
        "fit",
        "brand",
        "notes",
        "season",
        "rating",
        "category_id",
        "location_id",
        "image_url",
    ]:
        value = getattr(payload, field)
        if value is not None:
            setattr(db_item, field, value)

    if payload.tags is not None:
        db_item.tags.clear()
        for tag_name in payload.tags:
            tag = (
                db.query(models.Tag)
                .filter(models.Tag.name == tag_name)
                .first()
            )
            if not tag:
                tag = models.Tag(name=tag_name)
                db.add(tag)
                db.flush()
            if tag not in db_item.tags:
                db_item.tags.append(tag)

    db.commit()
    db.refresh(db_item)
    return db_item

def delete_item(db: Session, item_id: int):
    item = db.get(models.Item, item_id)
    if not item:
        return None

    db.delete(item)
    db.commit()
    return item

# ---------- LOCATIONS ----------

def get_locations(db: Session):
    return db.query(models.Location).all()

def create_location(db: Session, location: schemas.LocationCreate):
    db_loc = models.Location(**location.dict())
    db.add(db_loc)
    db.commit()
    db.refresh(db_loc)
    return db_loc

def update_location(db: Session, location_id: int, payload: schemas.LocationUpdate):
    loc = db.get(models.Location, location_id)
    if not loc:
        return None

    for field in [
        "name",
        "description",
        "comments",
        "width",
        "height",
        "grid_x",
        "grid_y",
    ]:
        value = getattr(payload, field)
        if value is not None:
            setattr(loc, field, value)

    db.commit()
    db.refresh(loc)
    return loc

def delete_location(db: Session, location_id: int):
    loc = db.get(models.Location, location_id)
    if not loc:
        return None

    # detach items to avoid FK errors (location_id uses ondelete SET NULL but SQLite needs explicit change)
    db.query(models.Item).filter(models.Item.location_id == location_id).update(
        {"location_id": None}
    )

    db.delete(loc)
    db.commit()
    return loc


# ---------- CATEGORIES ----------

def get_categories(db: Session):
    return db.query(models.Category).order_by(models.Category.name).all()


def create_category(db: Session, category: schemas.CategoryCreate):
    db_category = models.Category(name=category.name, comments=category.comments)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def update_category(db: Session, category_id: int, payload: schemas.CategoryUpdate):
    category = db.get(models.Category, category_id)
    if not category:
        return None

    for field in ["name", "comments"]:
        value = getattr(payload, field)
        if value is not None:
            setattr(category, field, value)

    db.commit()
    db.refresh(category)
    return category


def delete_category(db: Session, category_id: int):
    category = (
        db.query(models.Category)
        .filter(models.Category.id == category_id)
        .first()
    )
    if not category:
        return None

    if category.items:
        raise ValueError("Cannot delete category with existing items")

    db.delete(category)
    db.commit()
    return category
