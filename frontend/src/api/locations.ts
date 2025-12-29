import { fetchApi } from "./client";
import type { Location, LocationCreate, LocationUpdate } from "@/types/index";

export const locationsApi = {
  list: () => fetchApi<Location[]>("/locations/"),

  create: (data: LocationCreate) =>
    fetchApi<Location>("/locations/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: LocationUpdate) =>
    fetchApi<Location>(`/locations/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchApi<void>(`/locations/${id}`, {
      method: "DELETE",
    }),
};
