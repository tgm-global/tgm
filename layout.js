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

  // Add sticky style for header and footer on mobile and desktop
  var stickyStyle = document.createElement('style');
  stickyStyle.textContent = \`
    .site-header {
      position: sticky !important;
      top: 0 !important;
      z-index: 1000 !important;
    }
    .site-footer {
      position: sticky !important;
      bottom: 0 !important;
      z-index: 1000 !important;
    }
  \`;
  document.head.appendChild(stickyStyle);

  /* ---------- Header ---------- */
  var phoneHref = CONFIG.phoneTel ? 'tel:+' + CONFIG.phoneTel.replace(/\D/g, '') : '#';
  var phone = '<a class="phone" href="' + phoneHref + '" aria-label="Call us at ' + esc(CONFIG.phoneDisplay) + '"><strong>Call Now ' + esc(CONFIG.phoneDisplay) + '</strong></a>';

  var header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML =
    '<div class="wrap bar">' +
      '<a class="logo" href="index.html"><i><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l18-7-7 18-2.5-7.5z"/></svg></i>' + esc(CONFIG.brand) + '</a>' +
      '<nav class="site-nav" id="siteNav" aria-label="Main">' +
        CONFIG.nav.map(function (n) { return '<a href="' + esc(n[1]) + '"' + (n[1] === active ? ' aria-current="page"' : '') + '>' + esc(n[0]) + '</a>'; }).join('') +
      '</nav>' +
      phone +
      '<button class="menu-toggle" type
       
