import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import ts from 'typescript-eslint';

export default defineConfig(
    js.configs.recommended,
    ts.configs.strict,
    ts.configs.stylistic,

    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,

    // Oltava viimeinen tässä listassa!
    prettier,
);
