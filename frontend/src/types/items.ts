import type { Tag } from "./tags";

export interface Item {
  id: number;
  name: string;
  color?: string;
  fit?: string;
  brand?: string;
  notes?: string;
  season?: string;
  rating?: number;
  image_url?: string;
  category_id: number;
  location_id?: number;
  created_at: string;
  tags: Tag[];
}


// Create/Update DTOs
export interface ItemCreate {
  name: string;
  category_id: number;
  location_id?: number;
  color?: string;
  fit?: string;
  brand?: string;
  notes?: string;
  season?: string;
  rating?: number;
  image_url?: string;
  tags?: string[];
}

export interface ItemUpdate {
  name?: string;
  category_id?: number;
  location_id?: number | null;
  color?: string;
  fit?: string;
  brand?: string;
  notes?: string;
  season?: string;
  rating?: number;
  image_url?: string;
  tags?: string[];
}