import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Script } from 'node:vm';
import { assembleAssets, renderPages, createOutputs, root } from '../tools/build.mjs';

test('all original pages and asset source reconstruct without any changes', async () => {
  const expected = JSON.parse(await readFile(resolve(root, 'tests/preservation.json'), 'utf8'));
  const actual = { ...await renderPages(), ...await assembleAssets() };
  assert.deepEqual(Object.keys(actual).sort(), Object.keys(expected).sort());
  for (const [file, source] of Object.entries(actual)) {
    assert.equal(createHash('sha256').update(source).digest('hex'), expected[file], file);
  }
});

test('production output keeps HTML exact and reduces both shared assets', async () => {
  const outputs = await createOutputs();
  const originals = await assembleAssets();
  for (const [file, html] of Object.entries(await renderPages())) assert.equal(outputs[file], html, file);
  for (const [file, source] of Object.entries(originals)) {
    assert.ok(Buffer.byteLength(outputs[file]) < Buffer.byteLength(source) * 0.85, file);
  }
  new Script(outputs['js/scripts.js']);
});

test('domain and the legacy asset URLs remain intact', async () => {
  assert.equal((await readFile(resolve(root, 'CNAME'), 'utf8')).trim(), 'nxson.me');
  const pages = await renderPages();
  assert.match(pages['index.html'], /src="js\/scripts\.js"/);
  assert.match(pages['index.html'], /href="style\.css"/);
  assert.match(pages['index.html'], /href="mailto:chao@nxson\.me"/);
});
