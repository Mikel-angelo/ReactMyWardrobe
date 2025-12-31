import { useState } from "react";
import type { Item } from "@/types/index";

export type ItemDialogs = {
  selectedItem: Item | null;
  itemCardOpen: boolean;
  addItemOpen: boolean;
  deleteDialogOpen: boolean;
  itemToDelete: Item | null;
  editItem: Item | null;
  presetLocationId?: number;
  presetCategoryId?: number;
  openItemDetails: (item: Item) => void;
  closeItemDetails: () => void;
  openAddItem: (locationId?: number, categoryId?: number) => void;
  closeAddItem: () => void;
  editExistingItem: (item: Item) => void;
  requestDelete: (item: Item) => void;
  clearDeleteRequest: () => void;
};

export function useItemDialogs(): ItemDialogs {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [itemCardOpen, setItemCardOpen] = useState(false);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [presetLocationId, setPresetLocationId] = useState<number | undefined>();
  const [presetCategoryId, setPresetCategoryId] = useState<number | undefined>();

  const openItemDetails = (item: Item) => {
    setSelectedItem(item);
    setItemCardOpen(true);
  };

  const closeItemDetails = () => setItemCardOpen(false);

  const openAddItem = (locationId?: number, categoryId?: number) => {
    setPresetLocationId(locationId);
    setPresetCategoryId(categoryId);
    setEditItem(null);
    setAddItemOpen(true);
  };

  const closeAddItem = () => setAddItemOpen(false);

  const editExistingItem = (item: Item) => {
    setItemCardOpen(false);
    setEditItem(item);
    setAddItemOpen(true);
  };

  const requestDelete = (item: Item) => {
    setItemCardOpen(false);
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const clearDeleteRequest = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return {
    selectedItem,
    itemCardOpen,
    addItemOpen,
    deleteDialogOpen,
    itemToDelete,
    editItem,
    presetLocationId,
    presetCategoryId,
    openItemDetails,
    closeItemDetails,
    openAddItem,
    closeAddItem,
    editExistingItem,
    requestDelete,
    clearDeleteRequest,
  };
}
