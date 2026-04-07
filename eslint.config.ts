import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";
import json from "@eslint/json";
import svelteConfig from "./svelte.config.js";
import gitignore from "eslint-config-flat-gitignore";

export default defineConfig([
    js.configs.recommended,
    json.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    gitignore(),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    {
        files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
        // See more details at: https://typescript-eslint.io/packages/parser/
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: [".svelte"], // Add support for additional file extensions, such as .svelte
                parser: ts.parser,
                // Specify a parser for each language, if needed:
                // parser: {
                //   ts: ts.parser,
                //   js: espree,    // Use espree for .js files (add: import espree from 'espree')
                //   typescript: ts.parser
                // },

                // We recommend importing and specifying svelte.config.js.
                // By doing so, some rules in eslint-plugin-svelte will automatically read the configuration and adjust their behavior accordingly.
                // While certain Svelte settings may be statically loaded from svelte.config.js even if you don’t specify it,
                // explicitly specifying it ensures better compatibility and functionality.
                //
                // If non-serializable properties are included, running ESLint with the --cache flag will fail.
                // In that case, please remove the non-serializable properties. (e.g. `svelteConfig: { ...svelteConfig, kit: { ...svelteConfig.kit, typescript: undefined }}`)
                svelteConfig
            }
        }
    },
    stylistic.configs.customize({
        indent: 4,
        quotes: "double",
        semi: true,
        jsx: false,
        commaDangle: "never",
        braceStyle: "1tbs"
    }),
    {
        plugins: {
            "@stylistic": stylistic
        },

        rules: {
            // Override or add rule settings here, such as:
            // 'svelte/rule-name': 'error'
            "@stylistic/operator-linebreak": ["error", "after"],

            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-unused-expressions": "warn",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/ban-ts-comment": "warn",

            "svelte/require-each-key": "off",
            "svelte/no-unnecessary-state-wrap": "warn",

            "no-empty": "warn",
            "no-undef": "warn",
            "no-useless-escape": "warn"
        }
    }
]);
