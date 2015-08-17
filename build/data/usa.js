/**
 * This file scrapes the United States Social Security Actuarial Table and gets
 * life expectancy data for American citizens. This is pretty basic, to use it
 * you just copy the code and paste it into the console. It copies the JSON data
 * to your clipboard.
 *
 * @see http://www.ssa.gov/oact/STATS/table4c6.html
 */

/**
 * The data model.
 * @var {Array} model
 * @example
 * [
 *   {
 *     age: Number
 *     lifeExpectancy: {
 *       male: Number,
 *       female: Number
 *     }
 *   }
 * ]
 */
var model = []

/**
 * An easy way to loop through node lists.
 * @function each
 */
var each = function(nodeList, callback) {
  for (var i = 0; i < nodeList.length; i++) {
    callback(nodeList[i], i);
  }
};

/**
 * Just make sure a number is actually a number.
 * @function isNumber
 */
var isNumber = function(number) {
  if (typeof number === 'number' && number !== NaN) {
    return number;
  }
  return null;
};

var wrapper = document.querySelector('.grid_12 table table');
var rows = wrapper.querySelectorAll('tr');

each(rows, function(row, index) {
  var cols = row.querySelectorAll('td');
  var rowData = {
    lifeExpectancy: {}
  };

  each(cols, function(col, index) {
    if (index === 0) rowData.age = parseInt(col.innerHTML, 10);
    if (index === 3) rowData.lifeExpectancy.male = rowData.age + parseInt(col.innerHTML, 10);
    if (index === 6) rowData.lifeExpectancy.female = rowData.age + parseInt(col.innerHTML, 10);
  });

  model.push(rowData);
});

model = model.filter(function(row) {
  if (!row.age || !row.lifeExpectancy || !row.lifeExpectancy.male ||
    !row.lifeExpectancy.female) {
    return false;
  }

  var age = row.age;
  var maleYears = row.lifeExpectancy.male;
  var femaleYears = row.lifeExpectancy.female;

  return isNumber(age) && isNumber(maleYears) && isNumber(femaleYears);
});

// Copy the model to your clipboard. This method only exists in the Chrome
// console, don't use this script in any other context.
if (copy) {
  copy(model);
}