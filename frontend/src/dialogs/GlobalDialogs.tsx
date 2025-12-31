import type {
  ItemCreate,
  Location,
  LocationUpdate,
  Category,
  LocationCreate,
  CategoryCreate,
} from "@/types/index";
import type { ItemDialogs } from "@/hooks/useItemDialogs";
import type { LocationDialogs } from "@/hooks/useLocationDialogs";
import type { CategoryDialogs } from "@/hooks/useCategoryDialogs";

import { ItemCard } from "@/components/ItemCard";
import { LocationDetailsDialog } from "@/components/LocationDetailsDialog";
import { CategoryCard } from "@/components/CategoryCard";
import { AddItemForm } from "@/components/AddItemForm";
import { AddLocationForm } from "@/components/AddLocationForm";
import { AddCategoryForm } from "@/components/AddCategoryForm";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";

type Props = {
  // Item dialogs
  itemDialogs: ItemDialogs;
  onSubmitItem: (data: ItemCreate, editId?: number) => void;
  onConfirmDelete: () => void;
  locationDialogs: LocationDialogs;
  categoryDialogs: CategoryDialogs;

  // Add location
  addLocationOpen: boolean;
  setAddLocationOpen: (open: boolean) => void;
  onCreateLocation: (data: LocationCreate) => void;

  // Add category
  addCategoryOpen: boolean;
  setAddCategoryOpen: (open: boolean) => void;
  onCreateCategory: (data: CategoryCreate) => void;

  // Location details / edit / delete
  onUpdateLocation: (id: number, data: LocationUpdate) => void;
  locationItemCounts: Record<number, number>;
  onConfirmDeleteLocation: () => void;

  // Category details
  categoryItemCounts: Record<number, number>;
  onDeleteCategory: (category: Category) => void;
  onUpdateCategory: (id: number, data: { name?: string; comments?: string }) => void;

  // Shared data
  categories: Category[];
  locations: Location[];
};

export function GlobalDialogs({
  itemDialogs,
  onSubmitItem,
  onConfirmDelete,
  locationDialogs,
  categoryDialogs,

  addLocationOpen,
  setAddLocationOpen,
  onCreateLocation,

  addCategoryOpen,
  setAddCategoryOpen,
  onCreateCategory,

  onUpdateLocation,
  locationItemCounts,
  onConfirmDeleteLocation,

  categoryItemCounts,
  onDeleteCategory,
  onUpdateCategory,

  categories,
  locations,
}: Props) {
  return (
    <>
      <ItemCard
        item={itemDialogs.selectedItem}
        categories={categories}
        locations={locations}
        open={itemDialogs.itemCardOpen}
        onClose={itemDialogs.closeItemDetails}
        onEdit={itemDialogs.editExistingItem}
        onDelete={itemDialogs.requestDelete}
      />

      <AddItemForm
        open={itemDialogs.addItemOpen}
        onClose={itemDialogs.closeAddItem}
        onSubmit={onSubmitItem}
        categories={categories}
        locations={locations}
        presetLocationId={itemDialogs.presetLocationId}
        presetCategoryId={itemDialogs.presetCategoryId}
        editItem={itemDialogs.editItem}
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
        open={itemDialogs.deleteDialogOpen}
        onClose={itemDialogs.clearDeleteRequest}
        onConfirm={onConfirmDelete}
        itemName={itemDialogs.itemToDelete?.name || ""}
      />

      <LocationDetailsDialog
        open={locationDialogs.locationDialogOpen}
        location={locationDialogs.selectedLocation}
        itemCount={
          locationDialogs.selectedLocation
            ? locationItemCounts[locationDialogs.selectedLocation.id] || 0
            : 0
        }
        onClose={locationDialogs.closeLocationDetails}
        onSubmit={onUpdateLocation}
        onDeleteRequest={locationDialogs.requestDelete}
      />

      <DeleteConfirmDialog
        open={locationDialogs.locationDeleteDialogOpen}
        onClose={locationDialogs.clearDeleteRequest}
        onConfirm={onConfirmDeleteLocation}
        itemName={locationDialogs.locationToDelete?.name || ""}
      />

      <CategoryCard
        category={categoryDialogs.selectedCategory}
        itemCount={
          categoryDialogs.selectedCategory
            ? categoryItemCounts[categoryDialogs.selectedCategory.id] || 0
            : 0
        }
        open={categoryDialogs.categoryDialogOpen}
        onClose={categoryDialogs.closeCategoryDialog}
        onDelete={onDeleteCategory}
        onSubmit={onUpdateCategory}
      />
    </>
  );
}
