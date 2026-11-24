import { describe, expect, it } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { chooseOption, getActiveNode } from '@game/systems/dialogue';
import { scene, world } from '../src/runtime/content';

// Uses the real bundled bedroom.yaml and world.yaml (via the content runtime), not a hand-written fixture.
describe('opening dialogue', () => {
  it('shows the boy’s opening line with the two starting choices', () => {
    const state = createInitialState(world, scene);
    const node = getActiveNode(state, scene);

    expect(node?.text).toBe("I don't know what to do next. What should we do?");
    expect(node?.choices.map((choice) => choice.text)).toEqual(['Look around the room', "Let's explore"]);
  });

  it('moves to the look-around branch and sets looked_around when the first choice is picked', () => {
    const state = createInitialState(world, scene);
    const next = chooseOption(state, scene, 0);

    expect(next.activeDialogue).toBe('look-around');
    expect(next.flags.looked_around).toBe(true);
  });

  it('moves to the explore branch and sets exploring when the second choice is picked on a fresh state', () => {
    const state = createInitialState(world, scene);
    const next = chooseOption(state, scene, 1);

    expect(next.activeDialogue).toBe('explore');
    expect(next.flags.exploring).toBe(true);
  });

  it('ends the dialogue when the follow-up node’s only choice is picked', () => {
    const afterFirstChoice = chooseOption(createInitialState(world, scene), scene, 0);
    const finished = chooseOption(afterFirstChoice, scene, 0);

    expect(finished.activeDialogue).toBeNull();
  });
});
