# UNIT-833 — Act: Add frame CSS classes, Frame component, framed Button and wire them into the game screen

## Summary
frameKit plugin, Frame, Button frame variant, wiring

## Description
Generate .sf-frame-* and .sf-btn classes from FRAME_KIT, add components and apply them in the screen.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/frameKit.ts` · `new: frameComponentClasses` · new
- **Do:** Import FRAME_KIT from ../art/uiFrames. Export frameComponentClasses(): Record<string,Record<string,string>> that for bar, panel, plaque, parchment and slot returns '.sf-frame-<name>' with borderStyle 'solid', borderWidth '<slice>px', borderImage `url(/assets/ui/frames/<file>.png) <slice> fill / <slice>px stretch`, imageRendering 'pixelated'; for buttons returns '.sf-btn' (normal frame), '.sf-btn:hover:not(:disabled)' and ".sf-btn[data-state='hover']" (hover frame), '.sf-btn:active:not(:disabled)' and ".sf-btn[data-state='pressed']" (pressed), '.sf-btn:disabled' and ".sf-btn[data-state='disabled']" (disabled), and '.sf-cursor' with cursor url(/assets/ui/cursors/hand.png) 4 0, pointer.
- **Expected:** Returned object has a .sf-frame-panel key with imageRendering pixelated

### Step 2 — `game/frontend/tailwind.config.ts` · `plugins` · plugins array
- **Do:** Add a second plugin call: plugin(({ addComponents }) => addComponents(frameComponentClasses())), importing frameComponentClasses from './src/lib/frameKit'.
- **Expected:** Tailwind emits .sf-frame-* and .sf-btn classes

### Step 3 — `game/frontend/src/components/ui/Frame.tsx` · `new: Frame` · new
- **Do:** Export type FrameKind = 'bar'|'panel'|'plaque'|'parchment'|'slot' and component Frame({kind, as:Tag='div', className, ...props}) rendering <Tag className={cn(`sf-frame-${kind}`, className)} data-frame={kind} {...props} /> using cn from ../../lib/utils.
- **Expected:** Frame kind='panel' renders class sf-frame-panel

### Step 4 — `game/frontend/src/components/ui/button.tsx` · `ButtonVariant, variantClasses, ButtonProps, Button` · L5-L33
- **Do:** Extend ButtonVariant with 'frame'. Add variantClasses.frame = 'sf-btn inline-flex items-center gap-2 font-pixel text-sf-sm'. Add optional prop state?: 'normal'|'hover'|'pressed'|'disabled' to ButtonProps; destructure it and, when variant is 'frame', pass data-state={state} and disabled={props.disabled || state==='disabled'} to the element. Do not change default or ghost classes.
- **Expected:** <Button variant='frame' state='pressed'> has class sf-btn and data-state='pressed'

### Step 5 — `game/frontend/src/components/HeaderOverlay.tsx` · `HeaderOverlay` · L19-L53
- **Do:** Add class 'sf-frame-bar' to the <header> className and set variant="frame" on the Retry, Toggle sound and Settings Buttons (keep aria-label, aria-pressed and handlers).
- **Expected:** header has sf-frame-bar; the three buttons have sf-btn

### Step 6 — `game/frontend/src/components/GameLayout.tsx` · `GameLayout aside` · L22-L27
- **Do:** Append 'sf-frame-panel' to the motion.aside className and set variant="frame" on the Story toggle Button (keep aria-expanded and onClick).
- **Expected:** aside has sf-frame-panel and toggle has sf-btn

### Step 7 — `game/frontend/src/components/StoryPanel.tsx` · `StoryPanel dialogue and inventory` · L16, L35-L45
- **Do:** Add class 'sf-frame-parchment' to the <section aria-label="Dialogue"> and class 'sf-frame-slot' to each inventory <li>. Keep aria-labels and text.
- **Expected:** Dialogue section has sf-frame-parchment; inventory items have sf-frame-slot

### Step 8 — `game/frontend/src/App.tsx` · `Suggest What Happens Next trigger Button` · L70-L80
- **Do:** Set variant="frame" on the Button whose text is 'Suggest What Happens Next', keeping ref=triggerRef and its onClick.
- **Expected:** Trigger renders with class sf-btn

## Acceptance criteria
- Frame classes use border-image and image-rendering pixelated
- Button frame variant exposes four states
- Header, aside, dialogue, inventory and trigger use the kit

## Definition of done
- Game screen elements carry frame classes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-833.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-168
- Requirement: REQ-418
- Unit (Act): UNIT-833
- Unit (Verify): UNIT-837
- Status: completed
- Change: UPDATE
