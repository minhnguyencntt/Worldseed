export type Condition = { flag: string; equals?: boolean } | { hasItem: string };

export type GameEvent =
  | { type: 'set_flag'; flag: string; value: boolean }
  | { type: 'add_item'; item: string }
  | { type: 'remove_item'; item: string }
  | { type: 'goto_scene'; scene: string }
  | { type: 'say'; character: string; text: string }
  | { type: 'show_text'; text: string }
  | { type: 'discover'; object: string };

export type ActionDef = {
  id: 'inspect' | 'push' | 'search' | 'leave';
  label: string;
  conditions?: Condition[];
  events: GameEvent[];
};

export type ObjectDef = {
  id: string;
  name: string;
  description: string;
  actions: ActionDef[];
  openWhenFlag?: string;
};

export type DialogueChoice = {
  text: string;
  next?: string;
  events?: GameEvent[];
};

export type DialogueNode = {
  id: string;
  speaker: string;
  text: string;
  choices: DialogueChoice[];
};

export type SceneDef = {
  id: string;
  title: string;
  objects: ObjectDef[];
  openingDialogue?: string;
  dialogue: DialogueNode[];
};

export type WorldDef = {
  id: string;
  title: string;
  startScene: string;
  scenes: string[];
  characters: { id: string; name: string }[];
  flags: string[];
};

export type GameState = {
  currentScene: string;
  inventory: string[];
  discoveredObjects: string[];
  completedQuests: string[];
  relationships: Record<string, number>;
  flags: Record<string, boolean>;
  history: string[];
  activeDialogue: string | null;
};
