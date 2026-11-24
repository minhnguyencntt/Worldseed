// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('GameLayout drawer toggle and styles', () => {
  it('Given the game stylesheet, when it is read from disk, then legacy layout classes and the 768px breakpoint are absent and the placeholder contribution-sheet class is gone', () => {
    // Vitest runs from game/frontend (see the step's run command), so resolve from cwd.
    const css = readFileSync(join(process.cwd(), 'src', 'styles.css'), 'utf8');

    expect(css).not.toContain('.game-layout');
    expect(css).not.toContain('.story-panel');
    expect(css).not.toContain('.scene-area');
    expect(css).not.toContain('@media (max-width: 768px)');
    expect(css).not.toContain('.contribution-sheet');
  });
});
