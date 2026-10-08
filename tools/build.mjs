import { readFile, readdir, writeFile, rename } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import nunjucks from 'nunjucks';
import { transform } from 'esbuild';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const templates = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(resolve(root, 'src/partials'), { noCache: true }),
  { autoescape: false, throwOnUndefined: true },
);

export async function assembleAssets() {
  const manifest = JSON.parse(await readFile(resolve(root, 'src/assets.json'), 'utf8'));
  const join = async (files) => (await Promise.all(files.map((file) => readFile(resolve(root, file), 'utf8')))).join('');
  return {
    'js/scripts.js': await join(manifest.scripts),
    'style.css': await join(manifest.styles),
  };
}

export async function renderPages() {
  const files = (await readdir(resolve(root, 'src/pages'))).filter((file) => file.endsWith('.njk')).sort();
  return Object.fromEntries(await Promise.all(files.map(async (file) => [
    file.replace(/\.njk$/, '.html'),
    templates.renderString(await readFile(resolve(root, 'src/pages', file), 'utf8')),
  ])));
}

export async function createOutputs() {
  const assets = await assembleAssets();
  const outputs = await renderPages();
  for (const [file, source] of Object.entries(assets)) {
    const result = await transform(source, {
      loader: file.endsWith('.css') ? 'css' : 'js',
      sourcefile: file,
      // Keep identifiers, expressions, selectors, and rule order intact.
      minifyWhitespace: true,
      minifySyntax: false,
      minifyIdentifiers: false,
      legalComments: 'inline',
      charset: 'utf8',
      target: file.endsWith('.css') ? ['chrome100', 'firefox100', 'safari15.4'] : 'es2020',
    });
    outputs[file] = result.code;
  }
  return outputs;
}

export async function build({ check = false } = {}) {
  const outputs = await createOutputs();
  const stale = [];
  for (const [file, content] of Object.entries(outputs)) {
    const destination = resolve(root, file);
    const current = await readFile(destination, 'utf8').catch((error) => {
      if (error.code !== 'ENOENT') throw error;
      return null;
    });
    if (current === content) continue;
    if (check) stale.push(file);
    else {
      const temporary = `${destination}.build-tmp`;
      await writeFile(temporary, content);
      await rename(temporary, destination);
    }
  }
  if (stale.length) throw new Error(`Generated files are stale. Run npm run build:\n${stale.join('\n')}`);
  return outputs;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const outputs = await build({ check: process.argv.includes('--check') });
    console.log(`${process.argv.includes('--check') ? 'Verified' : 'Built'} ${Object.keys(outputs).length} files.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
