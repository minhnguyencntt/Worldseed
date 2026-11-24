# UNIT-046 — Verify: Single story-panel class unit tests

## Summary
Unit tests proving story-panel appears once in the composed layout

## Description
Add Testing Library tests in the existing layout test file that render GameLayout with StoryPanel and assert class uniqueness and drawer-open placement.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/layout.test.tsx` · `new: it('Given GameLayout wrapping StoryPanel, when rendered, then exactly one .story-panel exists')` · after L41
- **Do:** Add imports of StoryPanel from '../src/components/StoryPanel' at the top. Inside the describe block add a test rendering <GameLayout scene={<div/>} story={<StoryPanel node={undefined} history={[]} inventory={[]} onChoose={() => {}} />} /> and assert container.querySelectorAll('.story-panel').length toBe 1.

```
const { container } = render(<GameLayout scene={<div />} story={<StoryPanel node={undefined} history={[]} inventory={[]} onChoose={() => {}} />} />);
expect(container.querySelectorAll('.story-panel')).toHaveLength(1);
```

- **Run:** `cd game/frontend && npx vitest run tests/layout.test.tsx`
- **Expected:** Test passes with ACT1 applied and fails if StoryPanel root is story-panel.

### Step 2 — `game/frontend/tests/layout.test.tsx` · `new: it('Given the Story button clicked, when open, then only the aside has drawer-open and StoryPanel root is story-content')` · after the previous new test
- **Do:** Render the same composed layout, click the button named 'Story', then assert the single .story-panel element has class drawer-open, that container.querySelector('.story-content') is not null and does not have class story-panel.

```
fireEvent.click(screen.getByRole('button', { name: 'Story' }));
const panel = container.querySelector('.story-panel');
expect(panel).toHaveClass('drawer-open');
const content = container.querySelector('.story-content');
expect(content).not.toBeNull();
expect(content).not.toHaveClass('story-panel');
```

- **Run:** `cd game/frontend && npx vitest run tests/layout.test.tsx`
- **Expected:** All layout tests pass, including both new ones.

## Acceptance criteria
- Given GameLayout with StoryPanel, when rendered, then container.querySelectorAll('.story-panel') has length 1
- Given the Story button clicked, when open, then the single .story-panel has class drawer-open and .story-content does not
- Given StoryPanel alone, when rendered, then the root has story-content and not story-panel

## Definition of done
- New tests pass and fail against the old StoryPanel class
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-046.md`

## Links
- Evidence: EVD-009
- Requirement: REQ-023
- Unit (Act): UNIT-045
- Unit (Verify): UNIT-046
- Status: completed
- Change: UPDATE
