// gridSizing.ts

export function computeMinGridSize(params: {
  categoryCount: number;
  itemCount: number;
}) {
    const HEADER = 1.5;
    const CATEGORY = 0.6;
    const ITEM = 0.25;


  const minH = Math.max(
    4,
    Math.ceil(
      HEADER +
      params.categoryCount * CATEGORY +
      params.itemCount * ITEM
    )
  );

  const minW = params.categoryCount > 0 ? 4 : 3;

  return { minH, minW };
}
