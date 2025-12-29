export interface Category {
  id: number;
  name: string;
  comments?: string;
}

export interface CategoryCreate {
  name: string;
  comments?: string;
}

export interface CategoryUpdate {
  name?: string;
  comments?: string;
}

