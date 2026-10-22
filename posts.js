/*
 * Blog posts. To add a post, add an object to this list and re-run: node build-sitemap.js
 * Each post is served at blog-post.html?slug=<slug>. Body is plain HTML.
 */
(function () {
  window.BF = window.BF || {};
  window.BF.POSTS = [
    {
      slug: 'how-to-find-cheaper-domestic-flights',
      title: 'How to Find Cheaper Domestic Flights',
      date: '2026-10-22',
      excerpt: 'Simple, practical ways to lower the cost of a flight within the United States.',
      body:
        '<p>Flight prices change often, and two travellers on the same plane can pay very different amounts. These habits help you find a better fare without spending hours searching.</p>' +
        '<h2>1. Be flexible with dates</h2><p>If you can leave a day earlier or return a day later, ask for several date options. Midweek flights are often cheaper than Friday and Sunday flights.</p>' +
        '<h2>2. Compare nearby airports</h2><p>Many large cities have more than one airport. Check each one, and include the cost of getting there.</p>' +
        '<h2>3. Look at the total cost</h2><p>A low base fare can grow once you add a checked bag, seat selection or other fees. Compare the full cost of the trip.</p>' +
        '<h2>4. Start early for busy periods</h2><p>Holidays, school breaks and big events fill planes quickly. Start looking well ahead of time.</p>' +
        '<h2>5. Ask a person</h2><p>If your trip is complicated, <a href="index.html#search">send us your route</a> and we will look at options for you.</p>'
    },
    {
      slug: 'international-travel-document-checklist',
      title: 'International Travel Document Checklist',
      date: '2026-10-21',
      excerpt: 'What to check before you fly abroad, from passports to visas and travel insurance.',
      body:
        '<p>Missing paperwork is one of the most common reasons trips go wrong. Use this checklist well before you travel, and always confirm the rules with official sources for your destination.</p>' +
        '<h2>Passport</h2><ul><li>Check that your passport is valid for your whole trip. Some countries require extra validity beyond your return date.</li><li>Make sure you have blank pages if your destination asks for them.</li><li>Your ticket name must match your passport.</li></ul>' +
        '<h2>Visa or entry permission</h2><p>Some destinations need a visa or an electronic travel authorisation. Rules depend on your nationality and can change, so check before you book.</p>' +
        '<h2>Health and insurance</h2><p>Look at any health requirements for your destination. Consider travel insurance for medical care, delays and cancellations.</p>' +
        '<h2>Copies and backups</h2><p>Keep digital copies of your passport, tickets and hotel details somewhere you can reach them offline.</p>' +
        '<p>Ready to plan? See our <a href="flights-international.html">international destinations</a>.</p>'
    },
    {
      slug: 'carry-on-vs-checked-bag',
      title: 'Carry-On vs Checked Bag: What to Check Before You Fly',
      date: '2026-10-20',
      excerpt: 'Baggage rules differ by airline and fare. Here is what to look at before you pack.',
      body:
        '<p>Baggage rules vary between airlines and between fare types on the same airline. Check them before you pay, not at the airport.</p>' +
        '<h2>Questions to ask</h2><ul><li>Is a carry-on bag included in my fare?</li><li>What are the size and weight limits?</li><li>How much does a checked bag cost, and does it cost more at the airport?</li><li>Are there different rules on international or connecting flights?</li></ul>' +
        '<h2>Packing tips</h2><ul><li>Put medicines, documents, chargers and valuables in your carry-on.</li><li>Pack liquids in line with the security rules at your departure airport.</li><li>Weigh your bag at home.</li></ul>' +
        '<p>Want help with a specific airline? Start from our <a href="flights.html#airlines">airline pages</a>.</p>'
    },
    {
      slug: 'first-time-cruise-tips',
      title: 'First-Time Cruise Tips',
      date: '2026-10-19',
      excerpt: 'A short guide to choosing a region, season and cabin for your first cruise.',
      body:
        '<p>A cruise can be a relaxed way to see several places on one trip. If it is your first time, these basics can help you choose.</p>' +
        '<h2>Choose a region and season</h2><p>The Caribbean, Alaska and the Mediterranean are popular starting points. Each region has its own best months, so check the weather for the dates you want.</p>' +
        '<h2>Pick the length</h2><p>Shorter cruises are a good way to try the experience. Longer ones visit more ports.</p>' +
        '<h2>Understand what is included</h2><p>Meals are usually included, but drinks, excursions and gratuities often are not. Ask for a clear list.</p>' +
        '<h2>Plan your arrival</h2><p>Arrive at the departure city the day before if you can, so a flight delay does not cause you to miss the ship.</p>' +
        '<p>Ready to explore? Send a <a href="cruise.html">cruise enquiry</a>.</p>'
    }
  ];
})();
