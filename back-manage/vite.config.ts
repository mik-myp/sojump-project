import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: "static", // 静态资源目录
  resolve: {
    alias: {
      '@': '/src', // 将 @ 别名为 /src
    },
  },
});
