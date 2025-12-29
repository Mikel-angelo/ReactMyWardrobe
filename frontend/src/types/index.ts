export * from "./items";
export * from "./categories";
export * from "./locations";
export * from "./tags";

// layout.ts
import type { Layout } from "react-grid-layout";
export type LocationLayout = Layout;


// shared constants / unions
export const SEASONS = [
  "spring",
  "summer",
  "autumn",
  "winter",
  "all-year",
] as const;

export type Season = typeof SEASONS[number];

// import { Item, Category, Location, Season } from "../src/types";
