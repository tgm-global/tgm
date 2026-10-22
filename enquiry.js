/*
 * Enquiry form for Hotels, Cars, Cruise and Packages.
 * Usage: <div id="enquiry" data-product="Hotels"></div> + <script src="enquiry.js"></script>
 * Submits to Web3Forms (same access key as the flight enquiry form) and redirects to thankyou.html.
 */
(function () {
  var el = document.getElementById('enquiry');
  if (!el) return;
  var product = el.getAttribute('data-product') || 'Travel';
  var ACCESS_KEY = '036dbdb1-0c9d-4296-a846-677c36667a17';

  // [field name, label, type, options/placeholder, required]
  var FIELDS = {
    Hotels: [
      ['Destination', 'Destination city', 'text', 'e.g. Orlando, FL', true],
      ['Check_In', 'Check-in', 'date', '', true],
      ['Check_Out', 'Check-out', 'date', '', true],
      ['Rooms', 'Rooms', 'select', ['1', '2', '3', '4'], true],
      ['Guests', 'Guests', 'select', ['1', '2', '3', '4', '5', '6', '7', '8'], true],
      ['Hotel_Class', 'Hotel class', 'select', ['Any', '3 star', '4 star', '5 star'], false]
    ],
    Cars: [
      ['Pickup_Location', 'Pick-up location', 'text', 'City or airport', true],
      ['Dropoff_Location', 'Drop-off location', 'text', 'Same as pick-up if blank', false],
      ['Pickup_Date', 'Pick-up date', 'date', '', true],
      ['Return_Date', 'Return date', 'date', '', true],
      ['Car_Type', 'Car type', 'select', ['Economy', 'Compact', 'Mid-size', 'SUV', 'Minivan', 'Luxury'], false],
      ['Driver_Age', 'Driver age', 'select', ['25 or over', '21 to 24', 'Under 21'], false]
    ],
    Cruise: [
      ['Cruise_Region', 'Where would you like to cruise?', 'select', ['Caribbean', 'Alaska', 'Mediterranean', 'Mexico', 'Hawaii', 'Europe', 'Not sure yet'], true],
      ['Departure_Month', 'Preferred departure month', 'month', '', true],
      ['Duration', 'Length of cruise', 'select', ['3 to 5 nights', '6 to 8 nights', '9 to 14 nights', '15+ nights'], false],
      ['Departure_Port', 'Departure port (optional)', 'text', 'e.g. Miami, FL', false],
      ['Travellers', 'Travellers', 'select', ['1', '2', '3', '4', '5', '6', '7', '8'], true]
    ],
    Packages: [
      ['Destination', 'Destination', 'text', 'e.g. Las Vegas, NV', true],
      ['Departing_From', 'Departing from', 'text', 'e.g. New York, NY', true],
      ['Depart_Date', 'Departure date', 'date', '', true],
      ['Return_Date', 'Return date', 'date', '', true],
      ['Travellers', 'Travellers', 'select', ['1', '2', '3', '4', '5', '6', '7', '8'], true],
      ['Package_Type', 'Package', 'select', ['Flight + Hotel', 'Flight + Hotel + Car', 'Hotel + Car'], false],
      ['Budget', 'Approximate budget per person (optional)', 'text', 'e.g. 1500 USD', false]
    ]
  };

  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function field(f) {
    var id = 'f_' + f[0], req = f[4] ? ' required' : '', lbl = esc(f[1]) + (f[4] ? ' *' : '');
    var input;
    if (f[2] === 'select') {
      input = '<select id="' + id + '" name="' + f[0] + '"' + req + '>' + f[3].map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select>';
    } else {
      input = '<input id="' + id + '" name="' + f[0] + '" type="' + f[2] + '"' + req + (f[2] === 'text' ? ' placeholder="' + esc(f[3]) + '"' : '') + '>';
    }
    return '<div class="form-group"><label for="' + id + '">' + lbl + '</label>' + input + '</div>';
  }

  el.innerHTML =
    '<form action="https://api.web3forms.com/submit" method="POST" class="panel" id="enquiryForm">' +
      '<input type="hidden" name="access_key" value="' + ACCESS_KEY + '">' +
      '<input type="hidden" name="subject" value="New ' + esc(product) + ' Enquiry - bookflights.online">' +
      '<input type="hidden" name="from_name" value="bookflights.online">' +
      '<input type="hidden" name="redirect" id="enqRedirect" value="">' +
      '<input type="hidden" name="Enquiry_Type" value="' + esc(product) + '">' +
      '<input type="hidden" name="Page_URL" id="enqPage" value="">' +
      '<input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<div class="form-grid">' + FIELDS[product].map(field).join('') + '</div>' +
      '<div class="form-grid">' +
        '<div class="form-group"><label for="f_name">Full name *</label><input id="f_name" name="Full_Name" type="text" placeholder="John Doe" required></div>' +
        '<div class="form-group"><label for="f_email">Email address *</label><input id="f_email" name="Email_Address" type="email" placeholder="john@example.com" required></div>' +
        '<div class="form-group"><label for="f_phone">Phone number *</label><input id="f_phone" name="Phone_Number" type="tel" placeholder="+1 (555) 000-0000" required></div>' +
      '</div>' +
      '<div class="form-group"><label for="f_notes">Anything else we should know?</label><textarea id="f_notes" name="Notes" placeholder="Preferences, special requests, flexible dates..."></textarea></div>' +
      '<label class="consent"><input type="checkbox" name="Consent" value="Yes" required><span>I agree to be contacted about this enquiry and have read the <a href="privacy-policy.html">Privacy Policy</a>.</span></label>' +
      '<button type="submit" class="btn-submit">Send ' + esc(product.toLowerCase()) + ' enquiry</button>' +
    '</form>';

  // Redirect back to this site's thank-you page (works on any domain)
  document.getElementById('enqRedirect').value = new URL('thankyou.html', location.href).href;
  document.getElementById('enqPage').value = location.href;

  // Dates cannot be in the past; return must not be before the first date
  var today = new Date().toISOString().slice(0, 10);
  var form = document.getElementById('enquiryForm');
  Array.prototype.forEach.call(form.querySelectorAll('input[type="date"]'), function (d) { d.min = today; });
  var first = form.querySelector('input[type="date"]'), second = form.querySelectorAll('input[type="date"]')[1];
  if (first && second) first.addEventListener('change', function () { second.min = first.value || today; if (second.value && second.value < first.value) second.value = first.value; });
})();
