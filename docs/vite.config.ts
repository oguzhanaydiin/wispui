import { copyFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/wispui/" : "/",
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "spa-fallback",
      closeBundle() {
        const dir = resolve(import.meta.dirname, "dist")
        copyFileSync(resolve(dir, "index.html"), resolve(dir, "404.html"))
        writeFileSync(resolve(dir, ".nojekyll"), "")
      },
    },
  ],
  optimizeDeps: {
    exclude: ["wispui"],
  },
})
