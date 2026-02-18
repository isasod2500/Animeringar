import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
    css: {
        devSourcemap: true
    },

    
        build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                sass: resolve(__dirname, "SASS.html"),
            }
        }
    },
    plugins: [
        ViteImageOptimizer({
            jpg: {
                quality: 85
            },
            jpeg: {
                quality: 85
            },

            webp: {
                quality: 95
            },
            avif: {
                quality: 60
            },

        })
    ]
});