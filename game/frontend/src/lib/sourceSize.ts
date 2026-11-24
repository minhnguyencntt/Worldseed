export function countLines(t: string): number { return t === '' ? 0 : t.replace(/\n$/, '').split('\n').length; }
export function overLimit(f: { path: string; lines: number }[], max: number): string[] { return f.filter((x) => x.lines > max).map((x) => x.path); }
