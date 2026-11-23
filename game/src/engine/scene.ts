import { evaluateAll } from '../systems/conditions';
import { applyEvents } from '../systems/events';
import type { ActionDef, GameState, ObjectDef, SceneDef } from '../state/types';

export type SceneObjectView = Omit<ObjectDef, 'actions'> & {
  actions: ActionDef[];
  open: boolean;
};

export function getSceneView(state: GameState, scene: SceneDef): SceneObjectView[] {
  return scene.objects
    .filter((obj) => evaluateAll(state, obj.visibleWhen))
    .map((obj) => {
      const flag = obj.persistentState;
      const open = flag
        ? (state.flags[flag.flag] ?? flag.initial ?? false)
        : obj.openWhenFlag === undefined
          ? true
          : state.flags[obj.openWhenFlag] === true;
      return {
        ...obj,
        actions: obj.actions.filter((a) => evaluateAll(state, a.conditions)),
        open,
      };
    });
}

export function performAction(
  state: GameState,
  scene: SceneDef,
  objectId: string,
  actionId: string,
): GameState {
  const obj = scene.objects.find((o) => o.id === objectId);
  if (!obj) {
    return state;
  }
  const action = obj.actions.find((a) => a.id === actionId);
  if (!action) {
    return state;
  }
  if (!evaluateAll(state, action.conditions)) {
    return state;
  }
  return applyEvents(state, action.events);
}
