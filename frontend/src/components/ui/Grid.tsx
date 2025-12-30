import GridLayout, {
  type Layout,
  type ReactGridLayoutProps,
} from "react-grid-layout";
import type { JSX } from "react/jsx-dev-runtime";

export type GridProps = ReactGridLayoutProps & {
  layout: Layout;
};
export default GridLayout as unknown as (
  props: GridProps
) => JSX.Element;
    