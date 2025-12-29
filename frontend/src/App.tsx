import { useState } from "react";
import { Loader2 } from "lucide-react";

import { AppHeader } from "@/components/AppHeader";
import { ActionBar } from "@/components/ActionBar";
import { WardrobeMode } from "@/pages/WardrobeMode";
import { InventoryMode } from "@/pages/InventoryMode";
import { GlobalDialogs } from "@/dialogs/GlobalDialogs";
// in main.tsx or App.tsx
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
  useItems,
  useLocations,
  useCategories,
  useCreateItem,
  useUpdateItem,
  useDeleteItem,
  useCreateLocation,
  useUpdateLocation,
  useDeleteLocation,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/useWardrobe";

import type { Item, ItemCreate, Location, LocationUpdate, Category, CategoryUpdate } from "@/types/index";

type Mode = "wardrobe" | "inventory";
type InventoryView = "items" | "categories";

export default function App() {
  const [mode, setMode] = useState<Mode>("wardrobe");

  // data
  const { data: items = [], isLoading: itemsLoading } = useItems();
  const { data: locations = [], isLoading: locationsLoading } = useLocations();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const createItem = useCreateItem();
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();
  const createLocation = useCreateLocation();
  const updateLocation = useUpdateLocation();
  const deleteLocation = useDeleteLocation();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const isLoading = itemsLoading || locationsLoading || categoriesLoading;
  const [inventoryView, setInventoryView] = useState<InventoryView>("items");

  // dialog + UI state
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [itemCardOpen, setItemCardOpen] = useState(false);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [addLocationOpen, setAddLocationOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const [editItem, setEditItem] = useState<Item | null>(null);

  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationDeleteDialogOpen, setLocationDeleteDialogOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<Location | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const [presetLocationId, setPresetLocationId] = useState<number | undefined>();
  const [presetCategoryId, setPresetCategoryId] = useState<number | undefined>();

  // handlers
  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setItemCardOpen(true);
  };

  const handleAddItem = (locationId?: number, categoryId?: number) => {
    setPresetLocationId(locationId);
    setPresetCategoryId(categoryId);
    setEditItem(null);
    setAddItemOpen(true);
  };

  const handleEditItem = (item: Item) => {
    setItemCardOpen(false);
    setEditItem(item);
    setAddItemOpen(true);
  };

  const handleDeleteItem = (item: Item) => {
    setItemCardOpen(false);
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteItem.mutate(itemToDelete.id);
      setItemToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSubmitItem = (data: ItemCreate, editId?: number) => {
    editId
      ? updateItem.mutate({ id: editId, data })
      : createItem.mutate(data);
  };

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setLocationDialogOpen(true);
  };

  const handleUpdateLocation = (id: number, data: LocationUpdate) => {
    updateLocation.mutate({ id, data });
  };

  const handleDeleteLocation = (location: Location) => {
    setLocationToDelete(location);
    setLocationDeleteDialogOpen(true);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setCategoryDialogOpen(true);
  };

  const confirmDeleteLocation = () => {
    if (locationToDelete) {
      deleteLocation.mutate(locationToDelete.id);
    }
    setLocationDeleteDialogOpen(false);
    setLocationDialogOpen(false);
    setSelectedLocation(null);
    setLocationToDelete(null);
  };

  const locationItemCounts = items.reduce<Record<number, number>>(
    (acc, item) => {
      if (item.location_id) {
        acc[item.location_id] = (acc[item.location_id] || 0) + 1;
      }
      return acc;
    },
    {},
  );

  const categoryItemCounts = items.reduce<Record<number, number>>(
    (acc, item) => {
      if (item.category_id) {
        acc[item.category_id] = (acc[item.category_id] || 0) + 1;
      }
      return acc;
    },
    {},
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader mode={mode} onModeChange={setMode} />

      <ActionBar
        onAddItem={() => handleAddItem()}
        onAddLocation={() => setAddLocationOpen(true)}
        onAddCategory={() => setAddCategoryOpen(true)}
        onViewLocations={() => setMode("wardrobe")}
        onViewCategories={() => {
          setMode("inventory");
          setInventoryView("categories");
        }}
        onViewItems={() => {
          setMode("inventory");
          setInventoryView("items");
        }}
        stats={{
          locations: locations.length,
          categories: categories.length,
          items: items.length,
        }}
      />

      <main className="container py-4">
        {mode === "wardrobe" ? (
          <WardrobeMode
            locations={locations}
            categories={categories}
            items={items}
          onItemClick={handleItemClick}
          onAddItem={handleAddItem}
          onLocationClick={handleLocationClick}
        />
      ) : (
        <InventoryMode
          items={items}
          categories={categories}
          locations={locations}
          onItemClick={handleItemClick}
          view={inventoryView}
          onViewChange={setInventoryView}
          onDeleteItem={(id) => deleteItem.mutate(id)}
          onDeleteCategory={(id) => deleteCategory.mutate(id)}
          categoryItemCounts={categoryItemCounts}
          onCategoryClick={handleCategoryClick}
        />
      )}
      </main>

      <GlobalDialogs
        selectedItem={selectedItem}
        itemCardOpen={itemCardOpen}
        setItemCardOpen={setItemCardOpen}
        addItemOpen={addItemOpen}
        setAddItemOpen={setAddItemOpen}
        addLocationOpen={addLocationOpen}
        setAddLocationOpen={setAddLocationOpen}
        addCategoryOpen={addCategoryOpen}
        setAddCategoryOpen={setAddCategoryOpen}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        itemToDelete={itemToDelete}
        categories={categories}
        locations={locations}
        presetLocationId={presetLocationId}
        presetCategoryId={presetCategoryId}
        editItem={editItem}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        onSubmitItem={handleSubmitItem}
        onConfirmDelete={confirmDelete}
        onCreateLocation={(d) => createLocation.mutate(d)}
        onCreateCategory={(d) => createCategory.mutate(d)}
        // Location details / edit / delete
        selectedLocation={selectedLocation}
        locationDialogOpen={locationDialogOpen}
        setLocationDialogOpen={setLocationDialogOpen}
        onUpdateLocation={handleUpdateLocation}
        onRequestDeleteLocation={handleDeleteLocation}
        locationItemCounts={locationItemCounts}
        locationDeleteDialogOpen={locationDeleteDialogOpen}
        setLocationDeleteDialogOpen={setLocationDeleteDialogOpen}
        locationToDelete={locationToDelete}
        onConfirmDeleteLocation={confirmDeleteLocation}
        // Category details
        selectedCategory={selectedCategory}
        categoryDialogOpen={categoryDialogOpen}
        setCategoryDialogOpen={setCategoryDialogOpen}
        categoryItemCounts={categoryItemCounts}
        onDeleteCategory={(cat) => deleteCategory.mutate(cat.id)}
        onUpdateCategory={(id, data: CategoryUpdate) =>
          updateCategory.mutate({ id, data })
        }
      />
    </div>
  );
}
