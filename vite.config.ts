import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
<<<<<<< HEAD
      allowedHosts: ['.trycloudflare.com'],
  host: true,
=======
    host: "::",
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
