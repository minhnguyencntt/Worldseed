import type { SceneDef } from '../state/types';
import type { AssetManifest } from '../assets/manifest';
export type PreloadPlan = { load: string[]; unknown: string[] };
export function planPreload(scene: SceneDef, manifest: AssetManifest): PreloadPlan {
  const refs = new Set<string>();
  for (const o of scene.objects) if (o.asset) refs.add(o.asset);
  for (const e of scene.effects ?? []) if (e.type === 'dust') refs.add(e.asset);
  const known = new Set(manifest.assets.map((a) => a.id));
  const load: string[] = [];
  const unknown: string[] = [];
  for (const id of refs) (known.has(id) ? load : unknown).push(id);
  return { load, unknown };
}

export function resolveTextureKey(id: string | undefined, manifest: AssetManifest, fallbackId: string): string {
  return id !== undefined && manifest.assets.some((a) => a.id === id) ? id : fallbackId;
}
