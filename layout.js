/*
 * Shared header, breadcrumbs, common sections, footer and cookie banner for every page.
 * Edit this one file and all pages update.
 *
 * On each page (in <head>):
 *   <link rel="stylesheet" href="site.css">
 *   <script src="data.js"></script>
 *   <script>window.PAGE = { crumbs: [['Flights','flights.html'],['Domestic']], nav: 'flights.html' };</script>
 *   <script src="layout.js" defer></script>
 *
 * PAGE options:
 *   crumbs    breadcrumb trail after "Home". Last item has no link.
 *   nav       menu file to highlight (e.g. 'flights.html'). Defaults to the current file.
 *   faqs      [[question, answer], ...] page-specific FAQs (defaults to BF.FAQ_DEFAULT)
 *   skip      sections to leave out: any of 'deals', 'links', 'faq'
 */
(function () {
  var BF = window.BF || {};
  var P = window.PAGE || {};
  var esc = BF.esc || function (t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };

  var CONFIG = {
    brand: 'bookflights.online',
    domain: 'https://bookflights.online',
    phoneDisplay: '+1 692 555-3582',   // shown on screen, e.g. 1-800-000-0000
    phoneTel: '+1 692 555-3582',         // digits for the call link
    email: 'support@bookflights.online',
    nav: [
      ['Home', 'index.html'],
      ['Flights', 'flights.html'],
      ['Hotels', 'hotels.html'],
      ['Cars', 'cars.html'],
      ['Cruise', 'cruise.html'],
      ['Packages', 'packages.html'],
      ['Sitemap', 'sitemap.html'],
      ['About', 'about.html'],
      ['Contact', 'contact.html']
    ],
    // Social media handles: replace the URLs with your real profiles. Remove a line to hide it.
    social: [
      ['Facebook', 'https://www.facebook.com/bookflightsonline', 'f'],
      ['X (Twitter)', 'https://x.com/bookflightsonline', 'x'],
      ['Instagram', 'https://www.instagram.com/bookflightsonline', 'ig'],
      ['YouTube', 'https://www.youtube.com/@bookflightsonline', 'yt'],
      ['LinkedIn', 'https://www.linkedin.com/company/bookflightsonline', 'in']
    ],
    footerText: 'We may earn a commission when you book through our links, at no extra cost to you.',
    companyLinks: [['About', 'about.html'], ['Contact', 'contact.html'], ['Travel blog', 'blog.html'], ['FAQ', 'faq.html'], ['Sitemap', 'sitemap.html']],
    legalLinks: [['Privacy Policy', 'privacy-policy.html'], ['Terms and Conditions', 'terms-and-conditions.html'], ['Disclaimer', 'disclaimer.html'], ['Cookie Policy', 'cookie-policy.html']]
  };
  window.BF_CONFIG = CONFIG;

  var file = (location.pathname.split('/').pop() || 'index.html');
  var active = P.nav || file;
  function link(l) { return '<a href="' + esc(l[1]) + '">' + esc(l[0]) + '</a>'; }
  function absUrl(h) { return h === 'index.html' ? CONFIG.domain + '/' : CONFIG.domain + '/' + h; }
  function ld(obj) {
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }

  /* ---------- Header ---------- */
  var phoneHref = CONFIG.phoneTel ? 'tel:+' + CONFIG.phoneTel.replace(/\D/g, '') : '#';
  var phone = '<a class="phone" href="' + phoneHref + '" aria-label="Call us at ' + esc(CONFIG.phoneDisplay) + '"><strong>' + esc(CONFIG.phoneDisplay) + '</strong></a>';

  var header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML =
    '<div class="wrap bar">' +
      '<a class="logo" href="index.html"><i><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l18-7-7 18-2.5-7.5z"/></svg></i>' + esc(CONFIG.brand) + '</a>' +
      '<nav class="site-nav" id="siteNav" aria-label="Main">' +
        CONFIG.nav.map(function (n) { return '<a href="' + esc(n[1]) + '"' + (n[1] === active ? ' aria-current="page"' : '') + '>' + esc(n[0]) + '</a>'; }).join('') +
      '</nav>' +
      phone +
      '<button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="siteNav">&#9776;</button>' +
    '</div>';

  /* ---------- Breadcrumbs ---------- */
  var crumbs = [['Home', 'index.html']].concat(P.crumbs || []);
  var crumbNav = document.createElement('nav');
  crumbNav.className = 'crumbs';
  crumbNav.setAttribute('aria-label', 'Breadcrumb');
  crumbNav.innerHTML = '<div class="wrap"><ol>' + crumbs.map(function (c, i) {
    var last = i === crumbs.length - 1;
    return '<li>' + (last || !c[1] ? '<span aria-current="page">' + esc(c[0]) + '</span>' : '<a href="' + esc(c[1]) + '">' + esc(c[0]) + '</a>') + '</li>';
  }).join('') + '</ol></div>';
  ld({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(function (c, i) {
      var o = { '@type': 'ListItem', position: i + 1, name: c[0] };
      if (c[1] && i !== crumbs.length - 1) o.item = absUrl(c[1]);
      return o;
    })
  });
  if (file === 'index.html') {
    ld({
      '@context': 'https://schema.org', '@type': 'Organization', name: CONFIG.brand, url: CONFIG.domain + '/',
      sameAs: CONFIG.social.map(function (s) { return s[1]; })
    });
  }

  /* ---------- Footer + cookie banner ---------- */
  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  var footLinks = [['Blog', 'blog.html'], ['FAQ', 'faq.html']].concat(CONFIG.legalLinks);
  footer.innerHTML =
    '<div class="wrap fbar">' +
      '<div class="fmain">' +
        '<ul class="flinks">' + footLinks.map(function (n) { return '<li>' + link(n) + '</li>'; }).join('') + '<li><a href="#" id="cookieSettings">Cookie settings</a></li></ul>' +
        '<p class="fnote">&copy; ' + new Date().getFullYear() + ' ' + esc(CONFIG.brand) + '. ' + esc(CONFIG.footerText) + ' We are not an airline.</p>' +
      '</div>' +
      '<div class="social" aria-label="Social media">' +
        CONFIG.social.map(function (s) { return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener noreferrer me" aria-label="' + esc(s[0]) + '">' + esc(s[2]) + '</a>'; }).join('') +
      '</div>' +
      phone +
    '</div>' +
    '<div class="cookie" id="cookieBanner" role="dialog" aria-label="Cookie consent" hidden>' +
      '<p>We use essential cookies to make this site work. With your permission we may also use optional cookies to improve the site. Read our <a href="cookie-policy.html">Cookie Policy</a>.</p>' +
      '<div class="acts"><button type="button" id="cookieReject">Essential only</button><button type="button" class="yes" id="cookieAccept">Accept all</button></div>' +
    '</div>';

  document.body.insertBefore(header, document.body.firstChild);
  document.body.insertBefore(crumbNav, header.nextSibling);
  document.body.appendChild(footer);

  /* ---------- Common sections: deals, internal links, FAQ ---------- */
  var skip = P.skip || [];
  var h = '';
  if (skip.indexOf('deals') < 0 && BF.DEALS) {
    h += '<section class="sec" id="deals"><h2>Deals and popular routes</h2><p class="lead">Pick a route and send a quick request. We will come back with current fares. <a href="flights-deals.html">See all deals</a></p><div class="cards">' +
      BF.DEALS.map(function (d) {
        return '<a class="card-link" href="' + esc(BF.qurl(d[0], d[1])) + '"><span class="tag">Deal</span><b>' + esc(BF.city(d[0])) + ' &rarr; ' + esc(BF.city(d[1])) + '</b><span>Ask for today\'s best available fares</span><em>Request fares &rarr;</em></a>';
      }).join('') + '</div></section>';
  }
  if (skip.indexOf('links') < 0 && BF.EXPLORE) {
    h += '<section class="sec" id="explore"><h2>Explore more</h2><p class="lead">More ways to plan your trip.</p><div class="cards">' +
      BF.EXPLORE.filter(function (e) { return e[1] !== file; }).map(function (e) {
        return '<a class="card-link" href="' + esc(e[1]) + '"><b>' + esc(e[0]) + '</b><span>' + esc(e[2]) + '</span><em>Open &rarr;</em></a>';
      }).join('') + '</div></section>';
  }
  var faqs = [];
  if (skip.indexOf('faq') < 0) {
    faqs = P.faqs || BF.FAQ_DEFAULT || [];
    if (faqs.length) {
      h += '<section class="sec faq" id="faq"><h2>Frequently asked questions</h2><p class="lead">Quick answers. <a href="faq.html">View all FAQs</a></p>' +
        faqs.map(function (f) { return '<details><summary>' + esc(f[0]) + '</summary><p>' + esc(f[1]) + '</p></details>'; }).join('') + '</section>';
      ld({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map(function (f) { return { '@type': 'Question', name: f[0], acceptedAnswer: { '@type': 'Answer', text: f[1] } }; })
      });
    }
  }
  if (h) {
    var common = document.createElement('div');
    common.className = 'wrap common';
    common.innerHTML = h;
    document.body.insertBefore(common, footer);
  }

  /* ---------- Behaviour ---------- */
  function measure() {
    var r = document.documentElement.style;
    r.setProperty('--hh', header.offsetHeight + 'px');
    r.setProperty('--fh', footer.offsetHeight + 'px');
  }
  measure();
  window.addEventListener('resize', measure);
  if (window.ResizeObserver) { var ro = new ResizeObserver(measure); ro.observe(header); ro.observe(footer); }

  var toggle = header.querySelector('.menu-toggle'), nav = header.querySelector('.site-nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('active');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  var KEY = 'bf_cookie_consent', banner = document.getElementById('cookieBanner');
  function getC() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setC(v) { try { localStorage.setItem(KEY, v); } catch (e) {} banner.hidden = true; }
  if (!getC()) banner.hidden = false;
  document.getElementById('cookieAccept').onclick = function () { setC('all'); };
  document.getElementById('cookieReject').onclick = function () { setC('essential'); };
  document.getElementById('cookieSettings').onclick = function (e) { e.preventDefault(); banner.hidden = false; };
})();
       
