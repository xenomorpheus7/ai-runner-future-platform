import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Get site URL from environment or use default
  const siteUrl = process.env.VITE_SITE_URL || "https://airunner2033.com";
  
  return {
    base: "/",
    server: {
        allowedHosts: ['.trycloudflare.com'],
    host: true,
      port: 8080,
      proxy: {
        "/api/hf": {
          target: "http://localhost:8787",
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    plugins: [
      react(), 
      mode === "development" && componentTagger(),
      // Plugin to replace site URL in HTML during build
      {
        name: "html-transform",
        transformIndexHtml(html: string) {
          return html.replace(/https:\/\/airunner2033\.com/g, siteUrl);
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
