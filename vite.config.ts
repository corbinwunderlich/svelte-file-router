/// <reference types="vitest/config" />

import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
    plugins: [sveltekit()],

    ssr: {
        noExternal: true
    },

    resolve: {
        conditions: mode === "test" ? ["browser"] : []
    }
}));
