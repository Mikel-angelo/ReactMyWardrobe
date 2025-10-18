from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

locations = [
    {"id": 1, "name": "Top Shelf", "description": "Sweaters and hats"},
    {"id": 2, "name": "Drawer 1", "description": "T-shirts and pants"},
]

items = [
    { "id": 1, "name": "Blue Jeans", "category": "Pants", "season": "All-year", "locationId": 2 },
    { "id": 2, "name": "White Shirt", "category": "Top", "season": "Summer", "locationId": 2 },
    { "id": 3, "name": "Wool Sweater", "category": "Sweater", "season": "Winter", "locationId": 1 }
]

@app.get("/locations")
def get_locations():
    return locations

@app.post("/locations")
def add_location(location: dict):
    location["id"] = max([l["id"] for l in locations]) + 1 if locations else 1
    locations.append(location)
    return location

@app.get("/items")
def get_items():
    return items

@app.post("/items")
def add_item(item: dict):
    item["id"] = max([i["id"] for i in items]) + 1 if items else 1
    items.append(item)
    return item