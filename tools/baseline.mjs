import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { assembleAssets, renderPages, root } from './build.mjs';

const sources = { ...await renderPages(), ...await assembleAssets() };
const hashes = Object.fromEntries(Object.entries(sources).map(([file, source]) => [
  file, createHash('sha256').update(source).digest('hex'),
]));
await writeFile(resolve(root, 'tests/preservation.json'), `${JSON.stringify(hashes, null, 2)}\n`);
console.log('Updated the preservation baseline. Review this diff alongside intentional content or behavior changes.');
