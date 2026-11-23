import type { SceneDef, WorldDef } from '../../src/state/types';

// World whose declared characters and flags do not include the ids used by the scene below.
export const invalidWorld: WorldDef = {
  id: 'invalid-world',
  title: 'Invalid World',
  startScene: 'bedroom',
  scenes: ['bedroom'],
  characters: [{ id: 'boy', name: 'The Boy' }],
  flags: ['a'],
};

// Scene that references a missing scene, character, flag and object.
export const invalidScene: SceneDef = {
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
            { type: 'goto_scene', scene: 'nowhere' },
            { type: 'say', character: 'ghost', text: 'Boo.' },
            { type: 'set_flag', flag: 'zzz', value: true },
            { type: 'discover', object: 'nope' },
          ],
        },
      ],
    },
  ],
  dialogue: [],
};
