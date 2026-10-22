/*
 * Shared site data. Edit this one file to change airlines, destinations, deals and FAQs.
 * Load it (not deferred) in the <head> of every page, before layout.js.
 */
(function () {
  var BF = window.BF = {};
  BF.domain = 'https://bookflights.online';

  BF.esc = function (t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  BF.city = function (c) { return c.split(',')[0]; };

  // Link to the flight enquiry page with the route pre-filled
  BF.qurl = function (from, to, o) {
    o = o || {};
    var p = new URLSearchParams({ from: from, to: to, trip: o.trip || 'round' });
    if (o.airline) p.set('airline', o.airline);
    return 'query.html?' + p.toString();
  };

  /* ---------------- Airlines (used by the dynamic airline.html?a=slug page) ---------------- */
  BF.AIRLINES = [
    { slug: 'american-airlines', name: 'American Airlines', code: 'AA', alliance: 'oneworld',
      hubs: ['Dallas, TX', 'Charlotte, NC', 'Chicago, IL', 'Miami, FL', 'Phoenix, AZ', 'Philadelphia, PA'],
      blurb: 'American Airlines is one of the largest US carriers, with a wide domestic network and many international connections through its hub airports.' },
    { slug: 'delta-air-lines', name: 'Delta Air Lines', code: 'DL', alliance: 'SkyTeam',
      hubs: ['Atlanta, GA', 'Minneapolis, MN', 'Detroit, MI', 'Seattle, WA', 'New York, NY', 'Los Angeles, CA'],
      blurb: 'Delta Air Lines serves a large domestic and international network, with Atlanta as its best-known hub.' },
    { slug: 'united-airlines', name: 'United Airlines', code: 'UA', alliance: 'Star Alliance',
      hubs: ['Chicago, IL', 'Denver, CO', 'Houston, TX', 'Newark, NJ', 'San Francisco, CA', 'Washington, DC'],
      blurb: 'United Airlines operates a broad US network and a large number of international routes through its hub airports.' },
    { slug: 'southwest-airlines', name: 'Southwest Airlines', code: 'WN', alliance: '',
      hubs: ['Dallas, TX', 'Denver, CO', 'Las Vegas, NV', 'Phoenix, AZ', 'Baltimore, MD', 'Chicago, IL'],
      blurb: 'Southwest Airlines focuses on point-to-point domestic travel and short-haul routes across the United States.' },
    { slug: 'jetblue', name: 'JetBlue Airways', code: 'B6', alliance: '',
      hubs: ['New York, NY', 'Boston, MA', 'Orlando, FL', 'Los Angeles, CA', 'Miami, FL'],
      blurb: 'JetBlue Airways is known for its East Coast presence, with strong service from New York and Boston to Florida and the West Coast.' },
    { slug: 'alaska-airlines', name: 'Alaska Airlines', code: 'AS', alliance: 'oneworld',
      hubs: ['Seattle, WA', 'Portland, OR', 'San Francisco, CA', 'Los Angeles, CA', 'San Diego, CA'],
      blurb: 'Alaska Airlines has a strong West Coast network, with Seattle as its main hub.' },
    { slug: 'frontier-airlines', name: 'Frontier Airlines', code: 'F9', alliance: '',
      hubs: ['Denver, CO', 'Orlando, FL', 'Las Vegas, NV', 'Philadelphia, PA', 'Atlanta, GA'],
      blurb: 'Frontier Airlines is a low-fare carrier that serves many leisure destinations across the United States.' }
  ];

  /* ---------------- Destinations ---------------- */
  BF.DOMESTIC = [
    ['Los Angeles, CA', 'Beaches, studios, museums and year-round sunshine.'],
    ['Las Vegas, NV', 'Shows, dining and a quick weekend escape.'],
    ['Miami, FL', 'Beaches, nightlife and gateway to the Caribbean.'],
    ['Orlando, FL', 'Theme parks and family holidays.'],
    ['Chicago, IL', 'Architecture, food and lakefront walks.'],
    ['San Francisco, CA', 'Bridges, hills, tech and nearby wine country.'],
    ['Seattle, WA', 'Coffee, waterfront and mountain views.'],
    ['Denver, CO', 'Base for the Rocky Mountains and ski trips.'],
    ['Honolulu, HI', 'Island beaches, surf and volcano landscapes.'],
    ['Atlanta, GA', 'Major hub with food, history and culture.'],
    ['Boston, MA', 'Historic sites, universities and seafood.'],
    ['Austin, TX', 'Live music, food trucks and outdoor spaces.']
  ];
  BF.INTERNATIONAL = [
    ['London, UK', 'Royal landmarks, theatre and world-class museums.'],
    ['Paris, France', 'Art, cafes and iconic sights.'],
    ['Rome, Italy', 'Ancient ruins, piazzas and Italian cuisine.'],
    ['Amsterdam, Netherlands', 'Canals, cycling and museums.'],
    ['Tokyo, Japan', 'Food, technology and traditional temples.'],
    ['Delhi, India', 'Historic monuments, markets and street food.'],
    ['Dubai, UAE', 'Skyscrapers, shopping and desert experiences.'],
    ['Singapore', 'Clean, compact city with great food and gardens.'],
    ['Sydney, Australia', 'Harbour views, beaches and coastal walks.'],
    ['Toronto, Canada', 'Multicultural neighbourhoods and the CN Tower.'],
    ['Cancun, Mexico', 'Caribbean beaches and Mayan sites.'],
    ['Mexico City, Mexico', 'Museums, markets and Mexican cuisine.']
  ];

  /* ---------------- Deal ideas (shown on every page) ---------------- */
  BF.DEALS = [
    ['New York, NY', 'Los Angeles, CA'],
    ['Chicago, IL', 'Orlando, FL'],
    ['Dallas, TX', 'Las Vegas, NV'],
    ['Seattle, WA', 'San Francisco, CA'],
    ['Boston, MA', 'Miami, FL'],
    ['New York, NY', 'London, UK']
  ];

  /* ---------------- Pages for "Explore more" internal links ---------------- */
  BF.EXPLORE = [
    ['Flights', 'flights.html', 'Domestic, international and airline pages'],
    ['Hotels', 'hotels.html', 'Request hotel options for your stay'],
    ['Cars', 'cars.html', 'Request a rental car quote'],
    ['Cruise', 'cruise.html', 'Request cruise options and itineraries'],
    ['Packages', 'packages.html', 'Flight + hotel holiday packages'],
    ['Travel blog', 'blog.html', 'Tips and guides for planning a trip'],
    ['FAQ', 'faq.html', 'Answers to common questions'],
    ['Contact', 'contact.html', 'Talk to our team']
  ];

  /* ---------------- FAQs ---------------- */
  BF.FAQ_GROUPS = [
    { title: 'General', items: [
      ['What is bookflights.online?', 'bookflights.online is a travel search and enquiry website. You tell us about your trip, and our team follows up with available options by phone or email. We are not an airline, and we do not operate flights, hotels, cars or cruises ourselves.'],
      ['How do I request a flight?', 'Choose your route, dates, travellers and cabin class on the home page, then submit your contact details. Our team will get back to you with options and fares.'],
      ['Does sending an enquiry commit me to buy?', 'No. An enquiry only shares your trip details with us. Prices, taxes and any fees are shown to you before you confirm a booking.'],
      ['How quickly will you contact me?', 'We reply as soon as we can. Response times can vary depending on how many requests we have, and on the dates and destination you chose.']
    ]},
    { title: 'Flights', items: [
      ['Which routes can I search?', 'The home page search covers routes between 100 US cities. For international trips, use the international destinations page and send us an enquiry.'],
      ['Can I change or cancel a ticket?', 'Change and cancellation rules depend on the airline and the fare type you choose. The rules and any fees are shown before you pay.'],
      ['What about baggage?', 'Baggage allowances and fees differ between airlines and fares. Check the baggage rules for your fare before you book.'],
      ['Can I request a specific airline?', 'Yes. Open an airline page, such as Delta or United, and send an enquiry. Your airline preference is included in your request.']
    ]},
    { title: 'Hotels, cars, cruises and packages', items: [
      ['How do I book a hotel, car, cruise or package?', 'Each of these pages has an enquiry form. Fill in your plans and contact details, and our team will respond with options.'],
      ['Are prices shown on the website?', 'We do not display fixed prices for hotels, cars, cruises or packages. Rates change often, so we share current options after you send an enquiry.']
    ]},
    { title: 'Privacy and cookies', items: [
      ['What happens to my details?', 'We use the details you submit to respond to your enquiry. Read our Privacy Policy for how data is handled.'],
      ['Which cookies do you use?', 'We use essential cookies to make the site work and store your cookie choice. See the Cookie Policy for details.']
    ]}
  ];
  BF.FAQ_DEFAULT = [
    BF.FAQ_GROUPS[0].items[0], BF.FAQ_GROUPS[0].items[1], BF.FAQ_GROUPS[0].items[2],
    BF.FAQ_GROUPS[1].items[1], BF.FAQ_GROUPS[2].items[0]
  ];
})();
