
export interface Location {
  id: number;
  name: string;
  description?: string;
  comments?: string;
  width?: number;
  height?: number;
  grid_x?: number;
  grid_y?: number;
}

export interface LocationCreate {
  name: string;
  description?: string;
  comments?: string;
  width?: number;
  height?: number;
  grid_x?: number;
  grid_y?: number;
}

export interface LocationUpdate {
  name?: string;
  description?: string;
  comments?: string;
  width?: number;
  height?: number;
  grid_x?: number;
  grid_y?: number;
}