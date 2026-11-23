import { z } from 'zod';
import { boundsSchema } from '../assets/manifest/schema';

export const layerSchema = z.enum(['background', 'furniture', 'objects', 'characters', 'effects', 'ui']);

export const conditionSchema = z.union([
  z.object({ flag: z.string(), equals: z.boolean().optional() }),
  z.object({ hasItem: z.string() }),
]);

export const effectSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('dust'), asset: z.string(), count: z.number().int().positive(), area: boundsSchema }),
  z.object({ type: z.literal('ambientLight'), color: z.string(), alpha: z.number().min(0).max(1) }),
  z.object({ type: z.literal('transition'), kind: z.literal('fade'), durationMs: z.number().int().nonnegative() }),
]);

// Events are authored as open records; each must carry a string `type` discriminator.
export const eventSchema = z.object({ type: z.string() }).catchall(z.unknown());

export const actionSchema = z.object({
  id: z.enum(['inspect', 'push', 'search', 'leave']),
  label: z.string(),
  conditions: z.array(conditionSchema).optional(),
  events: z.array(eventSchema),
});

export const objectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  asset: z.string(),
  position: z.object({ x: z.number(), y: z.number() }),
  scale: z.number().positive().default(1),
  layer: layerSchema,
  interactionBounds: boundsSchema.optional(),
  actions: z.array(actionSchema),
  visibleWhen: z.array(conditionSchema).optional(),
  persistentState: z
    .object({ flag: z.string(), initial: z.boolean().optional() })
    .optional(),
  openWhenFlag: z.string().optional(),
});

export const sceneSchema = z.object({
  id: z.string(),
  title: z.string(),
  openingDialogue: z.string().optional(),
  dialogue: z.array(z.record(z.string(), z.unknown())),
  objects: z.array(objectSchema),
  effects: z.array(effectSchema).optional(),
});

export const worldSchema = z.object({
  id: z.string(),
  title: z.string(),
  startScene: z.string(),
  scenes: z.array(z.string()),
  characters: z.array(z.object({ id: z.string(), name: z.string() })),
  flags: z.array(z.string()),
});

export type Layer = z.infer<typeof layerSchema>;
export type ConditionSpec = z.infer<typeof conditionSchema>;
export type EventSpec = z.infer<typeof eventSchema>;
export type ActionSpec = z.infer<typeof actionSchema>;
export type ObjectSpec = z.infer<typeof objectSchema>;
export type EffectSpec = z.infer<typeof effectSchema>;
export type SceneSpec = z.infer<typeof sceneSchema>;
export type WorldSpec = z.infer<typeof worldSchema>;

export type WorldContentIssue = { path: string; message: string };

export type WorldContentResult =
  | { ok: true; data: SceneSpec | WorldSpec }
  | { ok: false; errors: WorldContentIssue[] };

// Joins a zod issue path such as ['objects', 0, 'position', 'x'] into
// 'objects.0.position.x' so callers can point at the failing field.
const formatPath = (path: readonly PropertyKey[]): string => path.map(String).join('.');

// Validates untrusted scene or world input without throwing, returning
// path-tagged issues instead of raising.
export function parseWorldContent(kind: 'scene' | 'world', input: unknown): WorldContentResult {
  const schema = kind === 'scene' ? sceneSchema : worldSchema;
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.issues.map((issue) => ({
        path: formatPath(issue.path),
        message: issue.message,
      })),
    };
  }
  return { ok: true, data: parsed.data };
}
