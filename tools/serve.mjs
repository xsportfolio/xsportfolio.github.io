import { createServer } from 'node:http';
import { createReadStream, watch } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { build, root } from './build.mjs';

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.avif': 'image/avif', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.pdf': 'application/pdf',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf',
};
await build();
const server = createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const parts = pathname.split('/').filter(Boolean);
    const allowed = parts.every((part) => !part.startsWith('.') && part !== 'node_modules')
      && (parts.length === 0 || ['img', 'css', 'js', 'project'].includes(parts[0])
        || (parts.length === 1 && (parts[0].endsWith('.html') || parts[0] === 'style.css')));
    if (!allowed) { response.writeHead(404).end('Not found'); return; }
    let file = resolve(root, `.${pathname}`);
    if (!file.startsWith(`${root}${sep}`) && file !== root) { response.writeHead(404).end(); return; }
    let info = await stat(file);
    if (info.isDirectory()) {
      file = resolve(file, 'index.html');
      info = await stat(file);
    }
    if (!info.isFile()) { response.writeHead(404).end(); return; }
    const headers = {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
      'Accept-Ranges': 'bytes', 'Content-Length': info.size,
    };
    const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    let start = 0, end = info.size - 1, status = 200;
    if (range) {
      start = Number(range[1]);
      end = range[2] ? Math.min(Number(range[2]), end) : end;
      if (start > end || start >= info.size) {
        response.writeHead(416, { 'Content-Range': `bytes */${info.size}` }).end(); return;
      }
      status = 206;
      headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
      headers['Content-Length'] = end - start + 1;
    }
    response.writeHead(status, headers);
    if (request.method === 'HEAD' || info.size === 0) response.end();
    else createReadStream(file, { start, end }).on('error', () => response.destroy()).pipe(response);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 400).end('Not found');
  }
});

if (process.argv.includes('--watch')) {
  let timer, pending = Promise.resolve();
  watch(resolve(root, 'src'), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      pending = pending.then(() => build()).then(() => console.log('Rebuilt; refresh the browser.'))
        .catch((error) => console.error(error.message));
    }, 100);
  });
}
server.listen(Number(process.env.PORT || 4173), '127.0.0.1', () => {
  console.log(`Portfolio preview: http://127.0.0.1:${server.address().port}`);
});
