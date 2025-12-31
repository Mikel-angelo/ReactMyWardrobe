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
import { useItemDialogs } from "@/hooks/useItemDialogs";
import { useLocationDialogs } from "@/hooks/useLocationDialogs";
import { useCategoryDialogs } from "@/hooks/useCategoryDialogs";

import type { Item, ItemCreate, Location, LocationUpdate, Category, CategoryUpdate } from "@/types/index";

type Mode = "wardrobe" | "inventory";
type InventoryView = "items" | "categories" | "locations";

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

  const itemDialogs = useItemDialogs();
  const locationDialogs = useLocationDialogs();
  const categoryDialogs = useCategoryDialogs();

  // dialog + UI state
  const [addLocationOpen, setAddLocationOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  // handlers
  const handleItemClick = (item: Item) => {
    itemDialogs.openItemDetails(item);
  };

  const handleAddItem = (locationId?: number, categoryId?: number) => {
    itemDialogs.openAddItem(locationId, categoryId);
  };

  const confirmDelete = () => {
    if (itemDialogs.itemToDelete) {
      deleteItem.mutate(itemDialogs.itemToDelete.id);
    }
    itemDialogs.clearDeleteRequest();
  };

  const handleSubmitItem = (data: ItemCreate, editId?: number) => {
    editId
      ? updateItem.mutate({ id: editId, data })
      : createItem.mutate(data);
  };

  const handleLocationClick = (location: Location) => {
    locationDialogs.openLocationDetails(location);
  };

  const handleUpdateLocation = (id: number, data: LocationUpdate) => {
    updateLocation.mutate({ id, data });
  };

  const handleCategoryClick = (category: Category) => {
    categoryDialogs.openCategoryDetails(category);
  };

  const confirmDeleteLocation = () => {
    if (locationDialogs.locationToDelete) {
      deleteLocation.mutate(locationDialogs.locationToDelete.id);
    }
    locationDialogs.resetAfterDelete();
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
        onViewLocations={() => {
          setMode("inventory");
          setInventoryView("locations");
        }}
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
            onLocationClick={handleLocationClick}
            view={inventoryView}
            onViewChange={setInventoryView}
            onDeleteItem={(id) => deleteItem.mutate(id)}
            onDeleteCategory={(id) => deleteCategory.mutate(id)}
            onDeleteLocation={(id) => deleteLocation.mutate(id)}
            categoryItemCounts={categoryItemCounts}
            onCategoryClick={handleCategoryClick}
          />
        )}
      </main>

      <GlobalDialogs
        itemDialogs={itemDialogs}
        locationDialogs={locationDialogs}
        categoryDialogs={categoryDialogs}
        addLocationOpen={addLocationOpen}
        setAddLocationOpen={setAddLocationOpen}
        addCategoryOpen={addCategoryOpen}
        setAddCategoryOpen={setAddCategoryOpen}
        onSubmitItem={handleSubmitItem}
        onConfirmDelete={confirmDelete}
        onCreateLocation={(d) => createLocation.mutate(d)}
        onCreateCategory={(d) => createCategory.mutate(d)}
        // Location details / edit / delete
        onUpdateLocation={handleUpdateLocation}
        locationItemCounts={locationItemCounts}
        onConfirmDeleteLocation={confirmDeleteLocation}
        // Category details
        categoryItemCounts={categoryItemCounts}
        onDeleteCategory={(cat) => deleteCategory.mutate(cat.id)}
        onUpdateCategory={(id, data: CategoryUpdate) =>
          updateCategory.mutate({ id, data })
        }
        categories={categories}
        locations={locations}
      />
    </div>
  );
}
