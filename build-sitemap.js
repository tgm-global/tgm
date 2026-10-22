/*
 * Regenerates sitemap.xml. Run after you add a page, airline or blog post:
 *   node build-sitemap.js
 * It lists every .html page in this folder (except the ones in EXCLUDE), plus one URL per
 * airline (data.js) and per blog post (posts.js).
 */
const fs = require('fs');
const vm = require('vm');
const DOMAIN = 'https://bookflights.online';
const EXCLUDE = ['query.html', 'thankyou.html', 'page-template.html', 'airline.html', 'blog-post.html'];

const ctx = { window: {} };
ctx.window.window = ctx.window;
vm.createContext(ctx);
['data.js', 'posts.js'].forEach(f => vm.runInContext(fs.readFileSync(f, 'utf8'), ctx));
const BF = ctx.window.BF;

const today = new Date().toISOString().slice(0, 10);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const entries = [];
const add = (path, prio, freq, date) => entries.push({ loc: DOMAIN + path, prio, freq, date: date || today });

const priority = { 'index.html': ['/', '1.0', 'weekly'], 'flights.html': ['/flights.html', '0.9', 'weekly'] };
fs.readdirSync('.').filter(f => f.endsWith('.html') && !EXCLUDE.includes(f)).sort().forEach(f => {
  if (priority[f]) add(priority[f][0], priority[f][1], priority[f][2]);
  else if (/^(privacy|terms|disclaimer|cookie)/.test(f)) add('/' + f, '0.3', 'yearly');
  else add('/' + f, f === 'faq.html' ? '0.7' : '0.8', 'monthly');
});
BF.AIRLINES.forEach(a => add('/airline.html?a=' + a.slug, '0.7', 'monthly'));
BF.POSTS.forEach(p => add('/blog-post.html?slug=' + p.slug, '0.6', 'monthly', p.date));

const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  entries.map(e => `  <url>\n    <loc>${esc(e.loc)}</loc>\n    <lastmod>${e.date}</lastmod>\n    <changefreq>${e.freq}</changefreq>\n    <priority>${e.prio}</priority>\n  </url>`).join('\n') +
  '\n</urlset>\n';
fs.writeFileSync('sitemap.xml', xml);
console.log('sitemap.xml written with ' + entries.length + ' URLs');
