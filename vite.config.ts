/// <reference types="vitest" />
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    include: ['**/*.test.tsx'],
    coverage: {
      provider: 'v8',
    },
    environment: 'jsdom',
    globals: true,
  },
  plugins: [preact()],
});
