import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

import { defaultExclude } from "vitest/config";

export default defineConfig(({ mode }) => ({
    plugins: [sveltekit()],

    ssr: {
        noExternal: true
    },

    resolve: {
        conditions: mode === "test" ? ["browser"] : []
    },

    test: {
        exclude: [
            ...defaultExclude,
            "./.direnv/**/*"
        ]
    }
}));
