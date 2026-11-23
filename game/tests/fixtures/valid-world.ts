import type { SceneDef, WorldDef } from '../../src/state/types';

// Fully consistent in-memory world: every reference resolves inside this fixture.
export const validWorld: WorldDef = {
  id: 'valid-world',
  title: 'Valid World',
  startScene: 'bedroom',
  scenes: ['bedroom'],
  characters: [{ id: 'boy', name: 'The Boy' }],
  flags: ['a'],
};

export const validScene: SceneDef = {
  id: 'bedroom',
  title: 'Bedroom',
  objects: [
    {
      id: 'door',
      name: 'Door',
      description: 'A closed door.',
      actions: [
        {
          id: 'leave',
          label: 'Leave',
          events: [
            { type: 'goto_scene', scene: 'bedroom' },
            { type: 'say', character: 'boy', text: 'Time to go.' },
            { type: 'set_flag', flag: 'a', value: true },
            { type: 'discover', object: 'door' },
          ],
        },
      ],
    },
  ],
  dialogue: [],
};
