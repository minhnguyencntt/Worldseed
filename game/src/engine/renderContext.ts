export interface RenderHandle { setVisible(visible: boolean): void; destroy(): void }
export interface RenderSpriteSpec { key: string; x: number; y: number; scale: number; depth: number }
export interface RenderContext { createSprite(spec: RenderSpriteSpec): RenderHandle }
