import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  js.configsx.recommended,
  { 
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
]);
