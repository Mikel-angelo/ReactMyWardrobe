import type {
  Item,
  ItemCreate,
  Location,
  LocationUpdate,
  Category,
  LocationCreate,
  CategoryCreate,
} from "@/types/index";

import { ItemCard } from "@/components/ItemCard";
import { LocationDetailsDialog } from "@/components/LocationDetailsDialog";
import { CategoryCard } from "@/components/CategoryCard";
import { AddItemForm } from "@/components/AddItemForm";
import { AddLocationForm } from "@/components/AddLocationForm";
import { AddCategoryForm } from "@/components/AddCategoryForm";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";

type Props = {
  // Item card
  selectedItem: Item | null;
  itemCardOpen: boolean;
  setItemCardOpen: (open: boolean) => void;
  onEditItem: (item: Item) => void;
  onDeleteItem: (item: Item) => void;

  // Add / edit item
  addItemOpen: boolean;
  setAddItemOpen: (open: boolean) => void;
  onSubmitItem: (data: ItemCreate, editId?: number) => void;
  editItem: Item | null;
  presetLocationId?: number;
  presetCategoryId?: number;

  // Add location
  addLocationOpen: boolean;
  setAddLocationOpen: (open: boolean) => void;
  onCreateLocation: (data: LocationCreate) => void;

  // Add category
  addCategoryOpen: boolean;
  setAddCategoryOpen: (open: boolean) => void;
  onCreateCategory: (data: CategoryCreate) => void;

  // Delete confirm
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  itemToDelete: Item | null;
  onConfirmDelete: () => void;

  // Location details / edit / delete
  selectedLocation: Location | null;
  locationDialogOpen: boolean;
  setLocationDialogOpen: (open: boolean) => void;
  onUpdateLocation: (id: number, data: LocationUpdate) => void;
  onRequestDeleteLocation: (location: Location) => void;
  locationItemCounts: Record<number, number>;
  locationDeleteDialogOpen: boolean;
  setLocationDeleteDialogOpen: (open: boolean) => void;
  locationToDelete: Location | null;
  onConfirmDeleteLocation: () => void;

  // Category details
  selectedCategory: Category | null;
  categoryDialogOpen: boolean;
  setCategoryDialogOpen: (open: boolean) => void;
  categoryItemCounts: Record<number, number>;
  onDeleteCategory: (category: Category) => void;
  onUpdateCategory: (id: number, data: { name?: string; comments?: string }) => void;

  // Shared data
  categories: Category[];
  locations: Location[];
};

export function GlobalDialogs({
  selectedItem,
  itemCardOpen,
  setItemCardOpen,
  onEditItem,
  onDeleteItem,

  addItemOpen,
  setAddItemOpen,
  onSubmitItem,
  editItem,
  presetLocationId,
  presetCategoryId,

  addLocationOpen,
  setAddLocationOpen,
  onCreateLocation,

  addCategoryOpen,
  setAddCategoryOpen,
  onCreateCategory,

  deleteDialogOpen,
  setDeleteDialogOpen,
  itemToDelete,
  onConfirmDelete,

  selectedLocation,
  locationDialogOpen,
  setLocationDialogOpen,
  onUpdateLocation,
  onRequestDeleteLocation,
  locationItemCounts,
  locationDeleteDialogOpen,
  setLocationDeleteDialogOpen,
  locationToDelete,
  onConfirmDeleteLocation,

  selectedCategory,
  categoryDialogOpen,
  setCategoryDialogOpen,
  categoryItemCounts,
  onDeleteCategory,
  onUpdateCategory,

  categories,
  locations,
}: Props) {
  return (
    <>
      <ItemCard
        item={selectedItem}
        categories={categories}
        locations={locations}
        open={itemCardOpen}
        onClose={() => setItemCardOpen(false)}
        onEdit={onEditItem}
        onDelete={onDeleteItem}
      />

      <AddItemForm
        open={addItemOpen}
        onClose={() => setAddItemOpen(false)}
        onSubmit={onSubmitItem}
        categories={categories}
        locations={locations}
        presetLocationId={presetLocationId}
        presetCategoryId={presetCategoryId}
        editItem={editItem}
      />

      <AddLocationForm
        open={addLocationOpen}
        onClose={() => setAddLocationOpen(false)}
        onSubmit={onCreateLocation}
      />

      <AddCategoryForm
        open={addCategoryOpen}
        onClose={() => setAddCategoryOpen(false)}
        onSubmit={onCreateCategory}
        categories={categories}   // 👈 ADD THIS
      />


      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={onConfirmDelete}
        itemName={itemToDelete?.name || ""}
      />

      <LocationDetailsDialog
        open={locationDialogOpen}
        location={selectedLocation}
        itemCount={
          selectedLocation
            ? locationItemCounts[selectedLocation.id] || 0
            : 0
        }
        onClose={() => setLocationDialogOpen(false)}
        onSubmit={onUpdateLocation}
        onDeleteRequest={onRequestDeleteLocation}
      />

      <DeleteConfirmDialog
        open={locationDeleteDialogOpen}
        onClose={() => setLocationDeleteDialogOpen(false)}
        onConfirm={onConfirmDeleteLocation}
        itemName={locationToDelete?.name || ""}
      />

      <CategoryCard
        category={selectedCategory}
        itemCount={
          selectedCategory ? categoryItemCounts[selectedCategory.id] || 0 : 0
        }
        open={categoryDialogOpen}
        onClose={() => setCategoryDialogOpen(false)}
        onDelete={onDeleteCategory}
        onSubmit={onUpdateCategory}
      />
    </>
  );
}
