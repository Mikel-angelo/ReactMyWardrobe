import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

import { categoriesApi } from "@/api/categories";
import { itemsApi } from "@/api/items";
import { locationsApi } from "@/api/locations";

import type {
  ItemCreate,
  ItemUpdate,
  LocationCreate,
  LocationUpdate,
  CategoryCreate,
  CategoryUpdate,
} from "@/types/index";


// --------------------
// Queries
// --------------------

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: itemsApi.list,
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: locationsApi.list,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoriesApi.list,
  });
}

// --------------------
// Item mutations
// --------------------

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ItemCreate) => itemsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({ title: "Item created" });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create item",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ItemUpdate }) =>
      itemsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({ title: "Item updated" });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update item",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => itemsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({ title: "Item deleted" });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete item",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// --------------------
// Location mutations
// --------------------

export function useCreateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LocationCreate) => locationsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast({ title: "Location created" });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create location",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: LocationUpdate }) =>
      locationsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast({ title: "Location updated" });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update location",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => locationsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      queryClient.invalidateQueries({ queryKey: ["items"] }); // items may lose location_id
      toast({ title: "Location deleted" });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete location",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// --------------------
// Category mutations
// --------------------

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryCreate) => categoriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Category created" });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create category",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryUpdate }) =>
      categoriesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Category updated" });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update category",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Category deleted" });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete category",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
