import { VariantProps, cva } from "class-variance-authority";
import { ResponsiveEnumProps } from "./type";

export type HTypeProps = { h?: ResponsiveEnumProps<VariantProps<typeof hVariants>["initial"]> };

export const hVariants = cva("", {
  variants: {
    initial: {
      "0": "h-0",
      "4": "h-4",
      "8": "h-8",
      "12": "h-12",
      "16": "h-16",
      "20": "h-20",
      "24": "h-24",
      "28": "h-28",
      "32": "h-32",
      "36": "h-36",
      "40": "h-40",
      "44": "h-44",
      "48": "h-48",
      "64": "h-64",
      "76": "h-76",
      "88": "h-88",
      "100": "h-100",
      "128": "h-128",
      "256": "h-256",
      "512": "h-512",
      "768": "h-768",
      "1024": "h-1024",
      "1440": "h-1440",
      "50%": "h-1/2",
      "100%": "h-full",
      screen: "h-screen",
    },
    xs: {
      "0": "xs:h-0",
      "4": "xs:h-4",
      "8": "xs:h-8",
      "12": "xs:h-12",
      "16": "xs:h-16",
      "20": "xs:h-20",
      "24": "xs:h-24",
      "28": "xs:h-28",
      "32": "xs:h-32",
      "36": "xs:h-36",
      "40": "xs:h-40",
      "44": "xs:h-44",
      "48": "xs:h-48",
      "64": "xs:h-64",
      "76": "xs:h-76",
      "88": "xs:h-88",
      "100": "xs:h-100",
      "128": "xs:h-128",
      "256": "xs:h-256",
      "512": "xs:h-512",
      "768": "xs:h-768",
      "1024": "xs:h-1024",
      "1440": "xs:h-1440",
      "50%": "xs:h-1/2",
      "100%": "xs:h-full",
      screen: "xs:h-screen",
    },
    md: {
      "0": "md:h-0",
      "4": "md:h-4",
      "8": "md:h-8",
      "12": "md:h-12",
      "16": "md:h-16",
      "20": "md:h-20",
      "24": "md:h-24",
      "28": "md:h-28",
      "32": "md:h-32",
      "36": "md:h-36",
      "40": "md:h-40",
      "44": "md:h-44",
      "48": "md:h-48",
      "64": "md:h-64",
      "76": "md:h-76",
      "88": "md:h-88",
      "100": "md:h-100",
      "128": "md:h-128",
      "256": "md:h-256",
      "512": "md:h-512",
      "768": "md:h-768",
      "1024": "md:h-1024",
      "1440": "md:h-1440",
      "50%": "md:h-1/2",
      "100%": "md:h-full",
      screen: "md:h-screen",
    },
    xl: {
      "0": "xl:h-0",
      "4": "xl:h-4",
      "8": "xl:h-8",
      "12": "xl:h-12",
      "16": "xl:h-16",
      "20": "xl:h-20",
      "24": "xl:h-24",
      "28": "xl:h-28",
      "32": "xl:h-32",
      "36": "xl:h-36",
      "40": "xl:h-40",
      "44": "xl:h-44",
      "48": "xl:h-48",
      "64": "xl:h-64",
      "76": "xl:h-76",
      "88": "xl:h-88",
      "100": "xl:h-100",
      "128": "xl:h-128",
      "256": "xl:h-256",
      "512": "xl:h-512",
      "768": "xl:h-768",
      "1024": "xl:h-1024",
      "1440": "xl:h-1440",
      "50%": "xl:h-1/2",
      "100%": "xl:h-full",
      screen: "xl:h-screen",
    },
  },
});
