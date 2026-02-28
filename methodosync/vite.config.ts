import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  // root = src/ so index.html source lives at src/index.html and is never
  // overwritten by the build (output goes to the parent directory).
  // This mirrors the theories/ Parcel pattern: parcel build src/index.html --dist-dir .
  root: resolve(__dirname, 'src'),
  plugins: [react()],
  base: '/methodosync/',
  build: {
    outDir: resolve(__dirname),   // methodosync/ root — sibling of src/
    emptyOutDir: false,
    assetsDir: 'assets',
    sourcemap: false,
  },
})
