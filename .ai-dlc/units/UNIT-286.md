# UNIT-286 — Act: Add Tailwind, PostCSS configs, directives and design tokens

## Summary
Create Tailwind and PostCSS configs and update styles.css

## Description
Add devDependencies, create the two config files and prepend directives plus token variables to src/styles.css, keeping all existing rules.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `devDependencies` · L16-L27
- **Do:** Add tailwindcss, postcss, autoprefixer and tailwindcss-animate to devDependencies, then run npm install in game/frontend

```
"tailwindcss": "^3.4.10", "postcss": "^8.4.41", "autoprefixer": "^10.4.20", "tailwindcss-animate": "^1.0.7"
```

- **Expected:** npm install exits 0 and node_modules/tailwindcss exists

### Step 2 — `game/frontend/postcss.config.js` · `new: default export` · new
- **Do:** Create ESM PostCSS config registering tailwindcss and autoprefixer plugins

```
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

- **Expected:** Vite picks up the config automatically

### Step 3 — `game/frontend/tailwind.config.ts` · `new: default export Config` · new
- **Do:** Create Tailwind config with darkMode 'class', content globs, theme.extend.colors background/foreground/primary/muted/border using hsl(var(--name)), borderRadius lg using var(--radius), and plugin tailwindcss-animate

```
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
export default { darkMode: 'class', content: ['./index.html','./src/**/*.{ts,tsx}'], theme: { extend: { colors: { background:'hsl(var(--background))', foreground:'hsl(var(--foreground))', primary:{DEFAULT:'hsl(var(--primary))',foreground:'hsl(var(--primary-foreground))'}, muted:'hsl(var(--muted))', border:'hsl(var(--border))' }, borderRadius: { lg:'var(--radius)' } } }, plugins: [animate] } satisfies Config;
```

- **Expected:** tsc accepts the file and the config exports content containing ./src/**/*.{ts,tsx}

### Step 4 — `game/frontend/src/styles.css` · `top of file` · before L1
- **Do:** Insert @tailwind base; @tailwind components; @tailwind utilities; and a :root block defining --background, --foreground, --primary, --primary-foreground, --muted, --border and --radius with warm dark pixel-RPG HSL values; do not remove any existing rule

```
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { --background: 24 20% 10%; --foreground: 38 40% 90%; --primary: 32 85% 55%; --primary-foreground: 24 20% 10%; --muted: 24 15% 18%; --border: 24 15% 28%; --radius: 0.25rem; }
```

- **Expected:** styles.css begins with the three directives and still contains .game-layout

## Acceptance criteria
- Given the frontend, when vite loads, then postcss.config.js registers tailwindcss and autoprefixer
- Given styles.css, when read, then directives and tokens precede the existing rules

## Definition of done
- Config files created; npm install succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-286.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-057
- Requirement: REQ-143
- Unit (Act): UNIT-286
- Unit (Verify): UNIT-289
- Status: completed
- Change: UPDATE
