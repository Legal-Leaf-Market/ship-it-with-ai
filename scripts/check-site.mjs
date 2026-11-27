// Checks every page in public/ before a merge: `node scripts/check-site.mjs`.
// Not a build step. Netlify still publishes public/ as it is.
import fs from 'node:fs';
import path from 'node:path';

const PUB = new URL('../public/', import.meta.url).pathname;
const ORIGIN = 'https://shipitwithai.heartofcolumbus.shop';
const errors = [];
const fail = (f, m) => errors.push(`${f}: ${m}`);

const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(PUB);
const pages = files.filter(f => f.endsWith('.html'));
const urlOf = f => { const r = '/' + path.relative(PUB, f); return r.endsWith('/index.html') ? r.slice(0, -10) : r === '/index.html' ? '/' : r.replace(/\.html$/, ''); };
const exists = p => {
  const clean = decodeURIComponent(p.split(/[?#]/)[0]);
  if (clean === '' || clean === '/') return true;
  const f = path.join(PUB, clean);
  return [f, f + '.html', path.join(f, 'index.html')].some(x => fs.existsSync(x) && fs.statSync(x).isFile());
};

const titles = new Map(), descs = new Map(), indexable = [];
for (const f of pages) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(PUB, f);
  const url = urlOf(f);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const canon = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (!title) fail(rel, 'no <title>'); else if (titles.has(title)) fail(rel, `title also on ${titles.get(title)}`); else titles.set(title, rel);
  if (!desc) fail(rel, 'no meta description'); else if (descs.has(desc)) fail(rel, `description also on ${descs.get(desc)}`); else descs.set(desc, rel);
  if (desc && desc.length > 200) fail(rel, `description is ${desc.length} characters`);
  if (!noindex) {
    if (canon !== ORIGIN + url) fail(rel, `canonical ${canon} should be ${ORIGIN + url}`);
    if (!/property="og:image"/.test(html)) fail(rel, 'no og:image');
    indexable.push(url);
  }
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(rel, `${h1s} <h1> elements`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { fail(rel, 'JSON-LD does not parse: ' + e.message); }
  }
  // Visible text: no em dash or en dash (repo rule 2).
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<pre[\s\S]*?<\/pre>/g, '').replace(/<[^>]+>/g, ' ');
  if (/[–—]|&mdash;|&ndash;/.test(text)) fail(rel, 'long dash in visible text');
  if (/\s-\s/.test(text)) fail(rel, 'spaced hyphen in visible text');
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) if (!exists(m[1])) fail(rel, `broken link ${m[1]}`);
}

// The booking form keeps its name and fields (repo rule 3).
const home = fs.readFileSync(path.join(PUB, 'index.html'), 'utf8');
if (!/<form[^>]*name="booking"[^>]*data-netlify="true"/.test(home)) fail('index.html', 'booking form missing or renamed');
for (const n of ['name', 'email', 'organization', 'format', 'where', 'group-size', 'when', 'message']) {
  if (!home.includes(`name="${n}"`)) fail('index.html', `booking field ${n} missing`);
}

// The sitemap lists exactly the indexable pages.
const sitemap = fs.readFileSync(path.join(PUB, 'sitemap.xml'), 'utf8');
const listed = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map(m => m[1].replace(ORIGIN, ''));
for (const u of indexable) if (!listed.includes(u)) fail('sitemap.xml', `missing ${u}`);
for (const u of listed) if (!indexable.includes(u)) fail('sitemap.xml', `lists ${u}, which is noindex or missing`);
if (!fs.readFileSync(path.join(PUB, 'robots.txt'), 'utf8').includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) fail('robots.txt', 'no Sitemap line');

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`ok: ${pages.length} pages, ${indexable.length} in the sitemap`);
