import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_PATH || "/vctrr1/social-media-app",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
