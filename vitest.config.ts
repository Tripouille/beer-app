import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    alias: {
      "@": "./src",
      "next/image": "./src/__mocks__/NextImage.tsx",
    },
  },
});
