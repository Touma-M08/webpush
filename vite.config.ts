import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
        }),
        react(),
        checker({ typescript: true }),
    ],
});