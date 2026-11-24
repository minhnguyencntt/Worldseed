import type { SceneDef } from '../../src/state/types';

// In-memory scene for runStep: a drawer that yields a key and a flag, a push
// action gated on holding the key, and a two-node dialogue tree.
export const runnerScene: SceneDef = {
  id: 'study',
  title: 'Study',
  objects: [
    {
      id: 'drawer',
      name: 'Drawer',
      description: 'A drawer that sticks.',
      actions: [
        {
          id: 'search',
          label: 'Search',
          events: [
            { type: 'add_item', item: 'key' },
            { type: 'set_flag', flag: 'found', value: true },
          ],
        },
        {
          id: 'push',
          label: 'Push',
          conditions: [{ hasItem: 'key' }],
          events: [{ type: 'show_text', text: 'The drawer slides open.' }],
        },
      ],
    },
  ],
  dialogue: [
    {
      id: 'n1',
      speaker: 'Clerk',
      text: 'Can I help you?',
      choices: [
        {
          text: 'Yes, talk to me.',
          events: [{ type: 'set_flag', flag: 'talked', value: true }],
          next: 'n2',
        },
        { text: 'No, thanks.' },
      ],
    },
    {
      id: 'n2',
      speaker: 'Clerk',
      text: 'Go on, then.',
      choices: [],
    },
  ],
};
