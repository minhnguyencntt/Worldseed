import type { CharacterSpec } from '../content/schema';
import type { AssetManifest } from '../assets/manifest';

export type CharacterAnimationName = 'idle' | 'walk' | 'interact';

// Pure: picks the asset/animation ref for a character state. Falls back to idle when the
// requested entry is absent, its asset is not in the manifest, or the animation is not defined on it.
export function resolveCharacterAnimation(
  spec: CharacterSpec,
  name: CharacterAnimationName,
  manifest: AssetManifest,
): { asset: string; animation: string } {
  const ref = spec.animations[name];
  if (!ref) return spec.animations.idle;
  const asset = manifest.assets.find((a) => a.id === ref.asset);
  if (!asset || !asset.animations || !(ref.animation in asset.animations)) return spec.animations.idle;
  return ref;
}
