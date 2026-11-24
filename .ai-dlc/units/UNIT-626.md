# UNIT-626 — Act: Add the shadcn-style Dialog wrapper

## Summary
Create ui/dialog.tsx over Radix dialog

## Description
Create game/frontend/src/components/ui/dialog.tsx wrapping @radix-ui/react-dialog following button.tsx conventions.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ui/dialog.tsx` · `new: Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogDescription` · new
- **Do:** Create the file importing * as DialogPrimitive from @radix-ui/react-dialog and cn from ../../lib/utils. Export Dialog = DialogPrimitive.Root and DialogClose = DialogPrimitive.Close. Add forwardRef DialogContent that renders DialogPrimitive.Portal containing DialogPrimitive.Overlay (fixed inset-0 bg-black/60) and DialogPrimitive.Content with cn base classes and the className prop. Add forwardRef DialogTitle and DialogDescription over DialogPrimitive.Title and DialogPrimitive.Description, and DialogHeader as a div.

```
export const DialogContent = forwardRef<ElementRef<typeof DialogPrimitive.Content>, ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(function DialogContent({ className, children, ...props }, ref) { return (<DialogPrimitive.Portal><DialogPrimitive.Overlay className="fixed inset-0 bg-black/60" /><DialogPrimitive.Content ref={ref} className={cn('fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', className)} {...props}>{children}</DialogPrimitive.Content></DialogPrimitive.Portal>); });
```

- **Expected:** Module exports the six named parts and type-checks

## Acceptance criteria
- dialog.tsx exports Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose
- DialogContent renders overlay and content in a Portal and merges className with cn

## Definition of done
- Named exports compile under tsc
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-626.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-126
- Requirement: REQ-313
- Unit (Act): UNIT-626
- Unit (Verify): UNIT-629
- Status: completed
- Change: UPDATE
