# UNIT-527 — Verify: Phaser render context unit tests

## Summary
Unit tests for createPhaserRenderContext with a fake Phaser scene

## Description
Test createSprite and the handle against a fake scene object, no real Phaser or canvas.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserRenderContext.test.ts` · `new: createSprite places image` · new
- **Do:** vi.mock('phaser') providing Geom.Rectangle (class storing args) and Geom.Rectangle.Contains. Build a fake scene whose add.image returns a chainable stub (setOrigin,setScale,setDepth,setInteractive,setVisible,setTint,clearTint,on,destroy as vi.fn) and add.text likewise. Call createPhaserRenderContext(scene, (id) => 'k:'+id).createSprite({key:'objects/x',x:5,y:6,scale:2,depth:3,label:'X',bounds:{x:0,y:0,width:10,height:20}}). Assert add.image called with (5,6,'k:objects/x'), setScale(2), setDepth(3), setInteractive called with a Rectangle of 0,0,10,20.
- **Run:** `cd game/frontend && npx vitest run tests/phaserRenderContext.test.ts -t 'places image'`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/phaserRenderContext.test.ts` · `new: handle behavior` · new
- **Do:** Add tests: setHighlighted(true) calls setTint, false calls clearTint; setLabelVisible(true) calls label.setVisible(true); setVisible(false) hides label; onHover registers pointerover/pointerout and cb receives true/false when invoked; onClick registers pointerdown; destroy calls destroy on image and label.
- **Run:** `cd game/frontend && npx vitest run tests/phaserRenderContext.test.ts`
- **Expected:** All tests in the file pass

## Acceptance criteria
- Image created with spec values and resolved key
- Interactive bounds, highlight, label and destroy behave as specified

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-527.md`

## Links
- Evidence: EVD-106
- Requirement: REQ-262
- Unit (Act): UNIT-524
- Unit (Verify): UNIT-527
- Status: completed
- Change: UPDATE
