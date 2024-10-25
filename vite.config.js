import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "components"),
      "@src": path.resolve(__dirname, "src"),
      "@utils": path.resolve(__dirname, "utils"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@store": path.resolve(__dirname, "store"),
      "@hooks": path.resolve(__dirname, "hooks"),
      "@styles": path.resolve(__dirname, "styles"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    // Recently commented below line
    exclude: ['chunk-TTUI27KJ.js'], 
  },
});
