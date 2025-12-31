import { useState } from "react";
import type { Category } from "@/types/index";

export type CategoryDialogs = {
  selectedCategory: Category | null;
  categoryDialogOpen: boolean;
  openCategoryDetails: (category: Category) => void;
  closeCategoryDialog: () => void;
};

export function useCategoryDialogs(): CategoryDialogs {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const openCategoryDetails = (category: Category) => {
    setSelectedCategory(category);
    setCategoryDialogOpen(true);
  };

  const closeCategoryDialog = () => setCategoryDialogOpen(false);

  return {
    selectedCategory,
    categoryDialogOpen,
    openCategoryDetails,
    closeCategoryDialog,
  };
}
