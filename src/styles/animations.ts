import { keyframes } from "@stitches/react";

export const rightSlideAnimation = keyframes({
  "0%": { transform: "translateX(-100%)" },
  "100%": { transform: "translateX(0)" },
});

export const leftSlideAnimation = keyframes({
  "0%": { transform: "translateX(100%)" },
  "100%": { transform: "translateX(0)" },
});

export const twinkleAnimation = keyframes({
  "0%": { opacity: 0.4 },
  "100%": { opacity: 1 },
});
