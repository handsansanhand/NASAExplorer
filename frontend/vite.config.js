import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

//the url will either be the BACKEND_URL (defined in vercel) or if its null, use the local url
const URL = process.env.BACKEND_URL || "http://localhost:3000";

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
