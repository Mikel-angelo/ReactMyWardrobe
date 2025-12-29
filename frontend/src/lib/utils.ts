import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// gridSizing.ts (or inline in LocationsGrid.tsx)

export function computeMinGridSize(params: {
  categoryCount: number;
  itemCount: number;
}) {
  const HEADER = 1;      // header row
  const CATEGORY = 1;    // each category header
  const ITEM = 0.5;      // each item row

  const minH = Math.max(
    2,
    Math.ceil(
      HEADER +
      params.categoryCount * CATEGORY +
      params.itemCount * ITEM
    )
  );

  const minW = params.categoryCount > 0 ? 4 : 3;

  return { minH, minW };
}
