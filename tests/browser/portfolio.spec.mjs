import { test, expect } from '@playwright/test';
import { assembleAssets } from '../../tools/build.mjs';

const originals = await assembleAssets();
const routes = ['/index.html', '/aboutMe.html', '/works.html', '/contact.html', '/ATS.html'];

async function inspect(page, route, original = false) {
  await page.bringToFront();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  // Keep remote font availability from making before/after comparisons nondeterministic.
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (request) => request.abort());
  if (original) {
    for (const [file, source] of Object.entries(originals)) {
      await page.route(`**/${file}`, (request) => request.fulfill({
        body: source, contentType: file.endsWith('.css') ? 'text/css' : 'text/javascript',
      }));
    }
  }
  const response = await page.goto(route, { waitUntil: 'load' });
  expect(response.status()).toBe(200);
  await page.waitForTimeout(2500);
  await page.evaluate(() => {
    window.gsap?.globalTimeline.pause();
    window.scrollTo(0, 0);
  });
  const state = await page.evaluate(() => {
    const selectors = ['.site-header', '.site-logo', '.menu-toggle', '.site-footer', '#content', '.aph-name', '.aph-image'];
    const styles = {};
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (!element) continue;
      const css = getComputedStyle(element);
      styles[selector] = Object.fromEntries([
        'display', 'position', 'width', 'height', 'color', 'backgroundColor',
        'fontFamily', 'fontSize', 'lineHeight',
      ].map((property) => [property, css[property]]));
    }
    return {
      title: document.title,
      links: [...document.querySelectorAll('a')].map((link) => link.getAttribute('href')),
      headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((heading) => heading.textContent.trim()),
      images: [...document.images].map((image) => image.getAttribute('src')),
      styles,
    };
  });
  return { ...state, errors };
}

for (const route of routes) {
  test(`preserves rendering and runtime behavior: ${route}`, async ({ page, browser }, info) => {
    // Legacy image measurements depend on cache state. Use a separate cold context
    // for the original assets so neither side warms the other's image cache.
    const { defaultBrowserType, ...options } = info.project.use;
    const baselineContext = await browser.newContext(options);
    try {
      const baseline = await baselineContext.newPage();
      const expected = await inspect(baseline, route, true);
      const actual = await inspect(page, route);
      expect(actual).toEqual(expected);
      if (route === '/index.html') {
        await page.screenshot({ path: info.outputPath('portfolio.png'), fullPage: true });
      }
    } finally {
      await baselineContext.close();
    }
  });
}

test('navigation opens and the portfolio link reaches the works page', async ({ page, isMobile }) => {
  await page.goto('/index.html');
  await page.waitForTimeout(1500);
  if (isMobile) await page.locator('.menu-toggle').click();
  const link = page.locator('.main-menu a[href="works.html"]');
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(/\/works\.html$/);
  await expect(page.locator('#content')).toBeVisible();
  await expect(page.locator('a[href="agroWeather.html"]').first()).toBeAttached();
});

test('preview serves embedded projects and rejects private paths', async ({ request }) => {
  for (const path of ['/project/clock/', '/project/sleep/', '/project/splitter/', '/project/mario/']) {
    expect((await request.get(path)).status()).toBe(200);
  }
  for (const path of ['/.git/config', '/node_modules/nunjucks/package.json', '/src/assets.json']) {
    expect((await request.get(path)).status()).toBe(404);
  }
});
