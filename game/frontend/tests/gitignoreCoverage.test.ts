import { readFileSync } from 'node:fs';
import { fileURLToPath, URL as NodeURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import { isIgnoredByDirRule } from '../src/lib/gitignore';

// The Node URL is aliased: the bare `URL` binding resolves to the jsdom
// global in this suite and yields an http:// URL that fileURLToPath rejects.
const readRealGitignore = (): string =>
  readFileSync(fileURLToPath(new NodeURL('../../../.gitignore', import.meta.url)), 'utf8');

const PHASER_PACKAGE_JSON = 'game/frontend/node_modules/phaser/package.json';

describe('gitignore coverage of game/frontend/node_modules', () => {
  it('ignores game/frontend/node_modules/phaser/package.json using the real .gitignore', () => {
    // Given the repository-root .gitignore read from disk,
    // when the helper checks game/frontend/node_modules/phaser/package.json,
    // then the depth-independent node_modules/ rule ignores it.
    expect(isIgnoredByDirRule(readRealGitignore(), PHASER_PACKAGE_JSON)).toBe(true);
  });

  it('does not ignore game/frontend/node_modules/phaser/package.json when only game/node_modules/ is listed', () => {
    // Given an ignore file containing only the game-scoped game/node_modules/ rule,
    // when the helper checks game/frontend/node_modules/phaser/package.json,
    // then the path is not ignored because the rule only covers one depth.
    expect(isIgnoredByDirRule('game/node_modules/\n', PHASER_PACKAGE_JSON)).toBe(false);
  });
});
