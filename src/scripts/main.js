import { Countdown }          from './lib/Countdown';
import { LifeExpectancy }     from './data/LifeExpectancy';
import { Templates }          from './template/Templates';

var DEBUG = true;

// The DOM wrapper for the app.
var app = document.getElementById('app');

// Local variables.
var templateRendered = false;
var historyInterval
var birthdateString;
var birthdate;
var deathdate;
var countdown;
var yearsOld;
var ageTable;

// Local methods.

/**
 * This app passes a birthdate in a query string
 * to make it work. This method extracts that birthdate.
 *
 * @method getBirthdateFromQueryString
 * @private
 * @param {String} url
 */
var getBirthdateFromQueryString = function(url) {
  return url.replace(/.*?\?birthdate=/, '');
};

/**
 * This method loops through the life expectancy array
 * and returns the date that the user will die.
 *
 * @method getDeathDate
 * @private
 * @param {Number} birthdate   The number should be a unix timestamp.
 */
var getDeathDate = function(birthdate) {
  // Close enough.
  yearsOld = Math.floor((Date.now() - birthdate) / 1000 / 60 / 60 / 24 / 365);

  // This is only going to support USA for now.
  ageTable = LifeExpectancy.USA;

  for (var i = 0; i < ageTable.length; i++) {
    if (ageTable[i].age === yearsOld) {
      return birthdate + ageTable[i].lifeExpectancy.male * 365 * 24 * 60 * 60 * 1000;
    }
  }
};

/**
 * Renders the appropriate view depending on the
 * state of the app.
 *
 * @method renderView
 * @private
 */
var renderView = function() {
  birthdateString = getBirthdateFromQueryString(location.href);

  if (birthdateString && birthdateString.indexOf('?birthdate=') > -1) {
    // If we've got a birthdate, clear that interval shit.
    clearInterval(historyInterval);

    birthdate = new Date(birthdateString).getTime();
    deathdate = getDeathDate(birthdate);
    countdown = new Countdown(deathdate);

    Templates.render('Countdown', app, [ countdown ]);
  } else {
    if (!templateRendered) {
      // Render the signup form.
      Templates.render('Signup', app);
    }
  }

  // Render the template, so it doesn't continuously do it
  // again and again.
  templateRendered = true;
};

// The interval constantly checks to see if there
// is a valid birthdate. If there is, it's going to
// freeze the app into it's final state. If there
// isn't, it will show the prompt for a birthdate.
historyInterval = setInterval(renderView, 100);

setTimeout(function() {
  app.classList.remove('loading');
}, 0);
