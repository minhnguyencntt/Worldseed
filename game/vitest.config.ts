import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({ resolve: { alias: { '@game': fileURLToPath(new URL('./src', import.meta.url)), phaser: fileURLToPath(new URL('./frontend/node_modules/phaser', import.meta.url)) } }, test: { include: ['tests/**/*.test.ts'] } });
