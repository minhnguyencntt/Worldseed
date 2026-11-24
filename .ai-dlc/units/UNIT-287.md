# UNIT-287 — Act: Add cn helper, components.json and shadcn Button

## Summary
Install deps and create cn, components.json and Button

## Description
Install runtime deps and create the helper, shadcn config and Button component.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `dependencies` · L10-L14
- **Do:** Add clsx, tailwind-merge, class-variance-authority, @radix-ui/react-slot and @radix-ui/react-dialog to dependencies and run npm install

```
"clsx": "^2.1.1", "tailwind-merge": "^2.5.2", "class-variance-authority": "^0.7.0", "@radix-ui/react-slot": "^1.1.0", "@radix-ui/react-dialog": "^1.1.1"
```

- **Expected:** npm install exits 0

### Step 2 — `game/frontend/src/lib/utils.ts` · `new: cn` · new
- **Do:** Create cn that merges clsx output through twMerge

```
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
```

- **Expected:** cn('px-2','px-4') returns 'px-4'

### Step 3 — `game/frontend/components.json` · `new: shadcn config` · new
- **Do:** Create shadcn config JSON with style 'default', rsc false, tsx true, tailwind.config 'tailwind.config.ts', tailwind.css 'src/styles.css', cssVariables true, aliases components '@/components' and utils '@/lib/utils'

```
{"$schema":"https://ui.shadcn.com/schema.json","style":"default","rsc":false,"tsx":true,"tailwind":{"config":"tailwind.config.ts","css":"src/styles.css","baseColor":"neutral","cssVariables":true},"aliases":{"components":"@/components","utils":"@/lib/utils"}}
```

- **Expected:** Valid JSON file exists

### Step 4 — `game/frontend/src/components/ui/button.tsx` · `new: Button, buttonVariants` · new
- **Do:** Create shadcn Button: cva with base classes and variants default (bg-primary text-primary-foreground), ghost, outline; sizes default, sm, icon; forwardRef component using Slot when asChild and cn(buttonVariants(...), className)

```
const Comp = asChild ? Slot : 'button'; return <Comp ref={ref} className={cn(buttonVariants({variant,size}), className)} {...props} />;
```

- **Expected:** Button renders a button with bg-primary

## Acceptance criteria
- Given src/lib/utils.ts, when imported, then cn is exported
- Given button.tsx, when imported, then Button and buttonVariants are exported

## Definition of done
- Files created and typecheck passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-287.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-057
- Requirement: REQ-144
- Unit (Act): UNIT-287
- Unit (Verify): UNIT-290
- Status: completed
- Change: UPDATE
