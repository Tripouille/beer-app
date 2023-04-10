import { createStitches } from "@stitches/react";

export const BREAKPOINT = {
  sm: "(min-width: 425px)",
} as const;

export const { styled, css, theme, getCssText } = createStitches({
  theme: {
    colors: {
      accent100: "#eeebff",
      accent700: "#483A8e",
      identity100: "#e4fafb",
      identity200: "#d9eef1",
      identity500: "#35335d",
      identity700: "#22204e",
      identity900: "#020034",
      negative100: "#feeeed",
      negative400: "#f5504f",
      negative500: "#e03231",
      negative700: "#ba1716",
      neutral000: "#ffffff",
      neutral100: "#f2f2f5",
      neutral200: "#e0e0eb",
      neutral400: "#8d9aa7",
      neutral700: "#3d5266",
      positive100: "#e4fafb",
      positive200: "#bbf2f6",
      positive400: "#1cd3df",
      positive500: "#06b9c4",
      positive700: "#00959e",
      warning100: "#fff5e1",
      warning400: "#ffc759",
      warning700: "#bf881d",
    },
    spaces: {
      xs: "0.5em",
      sm: "1em",
      md: "2em",
      lg: "4em",
      xl: "8em",
      xxl: "16em",
    },
    radius: {
      xs: "0.25em",
      sm: "0.5em",
      md: "1em",
      lg: "1.5em",
      xl: "3em",
      xxl: "6em",
    },
    fontSizes: {
      xs: "14px",
      sm: "16px",
      md: "18px",
      lg: "24px",
      xl: "32px",
      xxl: "48px",
    },
  },
});
