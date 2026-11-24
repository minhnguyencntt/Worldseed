const PIN = /^~?3\.90\.\d+$/;
export function phaserPinProblems(pkg: any, lock: any): string[] {
  const out: string[] = [];
  const a = pkg?.dependencies?.phaser;
  const b = lock?.packages?.['']?.dependencies?.phaser;
  const c = lock?.packages?.['node_modules/phaser']?.version;
  if (typeof a !== 'string' || !PIN.test(a)) out.push(`package.json dependencies.phaser is not 3.90.x: ${a}`);
  if (typeof b !== 'string' || !PIN.test(b)) out.push(`lockfile root phaser specifier is not 3.90.x: ${b}`);
  if (typeof c !== 'string' || !/^3\.90\.\d+$/.test(c)) out.push(`lockfile node_modules/phaser version is not 3.90.x: ${c}`);
  if (typeof a === 'string' && a !== b) out.push(`package.json (${a}) and lockfile root (${b}) specifiers differ`);
  return out;
}
