import { fetchApi } from "./client";
import type { Category, CategoryCreate, CategoryUpdate } from "@/types/index";

export const categoriesApi = {
  list: () => fetchApi<Category[]>("/categories/"),

  create: (data: CategoryCreate) =>
    fetchApi<Category>("/categories/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: CategoryUpdate) =>
    fetchApi<Category>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchApi<void>(`/categories/${id}`, {
      method: "DELETE",
    }),
};
