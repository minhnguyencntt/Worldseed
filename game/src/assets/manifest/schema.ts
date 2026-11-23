import { z } from 'zod';

export const dimensionsSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const originSchema = z.object({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
});

export const boundsSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
});

export const frameSpecSchema = z.object({
  frameWidth: z.number().int().positive(),
  frameHeight: z.number().int().positive(),
  frameCount: z.number().int().positive(),
  margin: z.number().int().nonnegative().optional(),
  spacing: z.number().int().nonnegative().optional(),
});

export const animationSchema = z.object({
  frames: z.array(z.number().int().nonnegative()).nonempty(),
  frameRate: z.number().positive(),
  repeat: z.number().int().min(-1).default(-1),
});

export const assetSchema = z
  .object({
    id: z.string().min(1),
    path: z.string().min(1),
    type: z.enum(['image', 'spritesheet', 'audio']),
    dimensions: dimensionsSchema.optional(),
    frames: frameSpecSchema.optional(),
    animations: z.record(z.string(), animationSchema).optional(),
    origin: originSchema.optional(),
    interactionBounds: boundsSchema.optional(),
  })
  .superRefine((asset, ctx) => {
    if (asset.type !== 'spritesheet') return;
    if (asset.frames === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['frames'],
        message: 'spritesheet assets require frames',
      });
    }
    if (asset.dimensions === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['dimensions'],
        message: 'spritesheet assets require dimensions',
      });
    }
    const frames = asset.frames;
    if (frames && asset.dimensions) {
      const { frameWidth, frameHeight, frameCount } = frames;
      if (frameWidth * frameCount > asset.dimensions.width) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['frames', 'frameCount'],
          message: 'frameCount exceeds sheet width',
        });
      }
      if (frameHeight > asset.dimensions.height) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['frames', 'frameHeight'],
          message: 'frameHeight exceeds sheet height',
        });
      }
    }
    if (frames) {
      for (const [name, anim] of Object.entries(asset.animations ?? {})) {
        if (anim.frames.some((index) => index >= frames.frameCount)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['animations', name, 'frames'],
            message: 'animation frame out of range',
          });
        }
      }
    }
  });

export const manifestSchema = z.object({
  version: z.literal(1),
  assets: z.array(assetSchema),
});

export type Dimensions = z.infer<typeof dimensionsSchema>;
export type Origin = z.infer<typeof originSchema>;
export type InteractionBounds = z.infer<typeof boundsSchema>;
export type FrameSpec = z.infer<typeof frameSpecSchema>;
export type AnimationDef = z.infer<typeof animationSchema>;
export type AssetEntry = z.infer<typeof assetSchema>;
export type AssetManifest = z.infer<typeof manifestSchema>;
