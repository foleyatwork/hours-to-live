/** @exports NumberUtils */

var NumberUtils = {

  /**
   * @method getNumberString
   * @param {Number}
   * @returns {String}
   */
  getNumberString: function(number) {
    var numberString = '' + number;
    var staticNumberString = numberString;
    var result;

    // The minimum for display numbers is 2 characters.
    // So if you passed this "1" it would return "01".
    if (numberString.length === 1) {
      numberString = '0' + numberString;
    }

    result = numberString.split('').reverse().map(function(value, index) {
      if (index % 3 === 0 && numberString.length > 4) {
        return value + ',';
      }

      return value;
    }).reverse().join('');

    if (result.charAt(result.length - 1) === ',') {
      return result.replace(/,$/, '');
    } else {
      return result;
    }
  }

};

export { NumberUtils };
