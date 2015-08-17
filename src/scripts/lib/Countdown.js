/**
 * This is a very basic countdown. It does not take into account
 * leap years, seconds, daylight savings time, or any of that crap.
 * Since precision isn't vital in this case, we're really just
 * aiming for a ballpark figure.
 *
 * @class Countdown
 * @param {Number} endDate A unix timestamp at some point in the future.
 */
class Countdown {
  constructor(endDate) {
    if (!endDate || typeof endDate !== 'number') {
      console.error('[Countdown]: invalid argument.');
      return;
    }

    this.end = endDate;
  }

  /**
   * When we access the classInstance.remaining property, it will
   * return an object with the hours, minutes, and seconds left in
   * the user's life.
   *
   * @prop {Object} remaining
   */
  get remaining() {
    // The total number of seconds from now until the day you die.
    var seconds = (this.end - Date.now()) / 1000;

    // Figure out how many hours you've got left.
    var hours = Math.floor(seconds / 3600);

    // Update the seconds to remove the seconds that make up the
    // hours figure.
    seconds = seconds - hours * 3600;

    // Figure out how many minutes you've got left.
    var minutes = Math.floor(seconds / 60);

    // Update the seconds to remove the seconds that make up the
    // minutes figure. This is the final form of seconds.
    seconds = Math.floor(seconds - minutes * 60);

    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
};

export { Countdown };
