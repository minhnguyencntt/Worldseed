import { evaluateAll } from '../systems/conditions';
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
