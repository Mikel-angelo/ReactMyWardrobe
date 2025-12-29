import { fetchApi } from "./client";
import type { Item, ItemCreate, ItemUpdate } from "@/types/index";

export const itemsApi = {
  list: () => fetchApi<Item[]>("/items/"),

  create: (data: ItemCreate) =>
    fetchApi<Item>("/items/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: ItemUpdate) =>
    fetchApi<Item>(`/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchApi<void>(`/items/${id}`, {
      method: "DELETE",
    }),
};
