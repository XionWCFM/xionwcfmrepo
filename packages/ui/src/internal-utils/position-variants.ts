import { VariantProps, cva } from "class-variance-authority";
import { ResponiveEnumProps } from "./type";
export type PositionTypeProps = { position?: ResponiveEnumProps<VariantProps<typeof positionVariants>["initial"]> };

export const positionVariants = cva("", {
  variants: {
    initial: {
      static: "static",
      fixed: "fixed",
      absolute: "absolute",
      relative: "relative",
      sticky: "sticky",
    },
    xs: {
      static: "xs:static",
      fixed: "xs:fixed",
      absolute: "xs:absolute",
      relative: "xs:relative",
      sticky: "xs:sticky",
    },
    md: {
      static: "md:static",
      fixed: "md:fixed",
      absolute: "md:absolute",
      relative: "md:relative",
      sticky: "md:sticky",
    },
    xl: {
      static: "xl:static",
      fixed: "xl:fixed",
      absolute: "xl:absolute",
      relative: "xl:relative",
      sticky: "xl:sticky",
    },
  },
});
