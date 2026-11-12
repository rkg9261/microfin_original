import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.blissful-villani.103-191-208-88.plesk.page",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
