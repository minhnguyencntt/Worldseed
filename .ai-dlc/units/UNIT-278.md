# UNIT-278 — Act: Add UI dependencies, Tailwind and shadcn config and cn helper

## Summary
Declare deps, add Tailwind/PostCSS/shadcn config, cn helper and directives

## Description
Add the UI stack dependencies and configuration files to game/frontend so Tailwind utilities and the shadcn cn helper work.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `dependencies / devDependencies` · L11-L28
- **Do:** Add dependencies zustand, motion, lucide-react, @radix-ui/react-dialog, class-variance-authority, clsx, tailwind-merge and devDependencies tailwindcss@^3.4.0, postcss, autoprefixer

```
"zustand": "^4.5.0", "motion": "^11.0.0", "lucide-react": "^0.400.0", "@radix-ui/react-dialog": "^1.1.0", "class-variance-authority": "^0.7.0", "clsx": "^2.1.0", "tailwind-merge": "^2.3.0"
```

- **Expected:** npm install in game/frontend resolves and package.json lists all packages

### Step 2 — `game/frontend/tailwind.config.ts` · `new: default export Config` · new
- **Do:** Create Tailwind config with content ['./index.html','./src/**/*.{ts,tsx}'], theme.extend empty, plugins []

```
export default { content: ['./index.html','./src/**/*.{ts,tsx}'], theme: { extend: {} }, plugins: [] } satisfies import('tailwindcss').Config;
```

- **Expected:** Tailwind finds classes in src

### Step 3 — `game/frontend/postcss.config.js` · `new: default export` · new
- **Do:** Create PostCSS config enabling tailwindcss and autoprefixer plugins

```
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

- **Expected:** Vite processes Tailwind directives

### Step 4 — `game/frontend/components.json` · `new: shadcn config` · new
- **Do:** Create shadcn components.json with style default, tailwind.config tailwind.config.ts, tailwind.css src/styles.css, aliases components 'src/components' and utils 'src/lib/utils'
- **Expected:** shadcn CLI can add components

### Step 5 — `game/frontend/src/lib/utils.ts` · `new: cn` · new
- **Do:** Export cn(...inputs: ClassValue[]) returning twMerge(clsx(inputs))

```
import { clsx, type ClassValue } from 'clsx'; import { twMerge } from 'tailwind-merge'; export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
```

- **Expected:** cn('a', false, 'b') === 'a b'

### Step 6 — `game/frontend/src/styles.css` · `top of file` · before L1
- **Do:** Insert @tailwind base; @tailwind components; @tailwind utilities; as the first three lines, keeping all existing rules below

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- **Expected:** styles.css begins with the three directives

## Acceptance criteria
- package.json declares all UI dependencies
- tailwind.config.ts scans index.html and src/**/*.{ts,tsx}
- src/lib/utils.ts exports cn
- styles.css starts with the three @tailwind directives

## Definition of done
- Files exist and npm run build succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-278.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-056
- Requirement: REQ-139
- Unit (Act): UNIT-278
- Unit (Verify): UNIT-282
- Status: completed
- Change: UPDATE
