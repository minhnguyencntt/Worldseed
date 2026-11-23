// Replaceable asset map: swap a value here to change the rendered scene background.
export const ASSET_PATHS: Record<string, string> = {
  'scene:bedroom': '/assets/bedroom.svg',
};

// Clickable hotspot rectangles, in percentages of the scene image box.
export const HOTSPOTS: Record<
  string,
  { left: string; top: string; width: string; height: string }
> = {
  bed: { left: '51.56%', top: '47.22%', width: '31.25%', height: '19.44%' },
  bookshelf: { left: '34.38%', top: '16.67%', width: '13.75%', height: '50%' },
  desk: { left: '6.25%', top: '55.56%', width: '21.88%', height: '15.56%' },
  'old-computer': { left: '11.88%', top: '40%', width: '9.38%', height: '18.89%' },
  window: { left: '9.38%', top: '13.89%', width: '18.75%', height: '27.78%' },
  door: { left: '84.38%', top: '22.22%', width: '12.5%', height: '44.44%' },
};
