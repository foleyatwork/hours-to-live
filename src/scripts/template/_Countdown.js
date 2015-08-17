/** @exports TemplateCountdown */

import { NumberUtils } from '../lib/NumberUtils';

var _Countdown = {
  _getTemplate: function(_countdown) {
    _Countdown.countdownInstance = _countdown;

    var data = _countdown.remaining;
    var hours = NumberUtils.getNumberString(data.hours);
    var minutes = NumberUtils.getNumberString(data.minutes);
    var seconds = NumberUtils.getNumberString(data.seconds);

    return '<div class="appCountdown">' +
      '<div class="appCountdown-inner">' +
        '<div class="appCountdown-hours" id="appCountdown-hours">' + hours + '</div>' +
        '<div class="appCountdown-caption">Hours to Live</div>' +
        '<div class="appCountdown-reset"><a href="/">Reset</a></div>' +
        '<div class="appCountdown-minutes-seconds" id="appCountdown-minutes-seconds">' + minutes + ':' + seconds + '</div>' +
      '</div>' +
    '</div>';
  },

  _renderFn: function() {
    var self = _Countdown;
    var hours = document.getElementById('appCountdown-hours');
    var mmss = document.getElementById('appCountdown-minutes-seconds');
    var current = self.countdownInstance.remaining;
    var mostRecent = current;
    var secondsString;
    var minutesString;
    var hoursString;

    var intervalCallback = function() {
      secondsString = NumberUtils.getNumberString(current.seconds);
      minutesString = NumberUtils.getNumberString(current.minutes);
      hoursString = NumberUtils.getNumberString(current.hours);

      current = self.countdownInstance.remaining;

      if (mostRecent.hours !== current.hours) {
        hours.innerHTML = hoursString;
      }

      mmss.innerHTML = minutesString + ':' + secondsString;

      mostRecent = current;
    };

    intervalCallback();
    setInterval(intervalCallback, 1000);
  }
};

export { _Countdown };
