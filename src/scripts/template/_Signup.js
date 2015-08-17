/** @exports TemplateSignup */

var _Signup = {
  _getTemplate: function() {
    return '<div id="appSignupForm" class="appSignupForm">' +
      '<h2 class="appSignupForm-input-heading">When were you born?</h2>' +
      '<div id="appSignupForm-form" class="appSignupForm-form">' +
        '<input type="date" id="appSignupForm-input-birthdate" class="appSignupForm-input-birthdate">' +
        '<div id="appSignupForm-input-submit" class="appSignupForm-input-submit hidden">Submit</div>' +
      '</div>' +
    '</div>';
  },

  _renderFn: function() {
    var el = document.getElementById('appSignupForm');
    var birthday = el.querySelector('#appSignupForm-input-birthdate');
    var submit = el.querySelector('#appSignupForm-input-submit');
    var padding = (birthday.clientHeight - submit.clientHeight) / 2;
    var isValidBirthday;
    var isValidBirthdayInterval;

    // Set the layout of the submit button.
    submit.style.paddingTop = padding + 'px';
    submit.style.paddingBottom = padding + 'px';

    isValidBirthday = false;
    isValidBirthdayInterval = setInterval(function() {
      isValidBirthday = !!birthday.value;

      if (isValidBirthday) {
        submit.classList.add('visible');
      } else {
        submit.classList.remove('visible');
      }
    }, 100);

    submit.addEventListener('click', function() {
      if (isValidBirthday === false) {
        return;
      }

      var birthdate = birthday.value;

      // Clear the interval so we don't take up
      // memory unnecessarily.
      clearInterval(isValidBirthdayInterval);

      // Now change the URL. This will trigger
      // the view update.
      history.pushState(null, '', '?birthdate=' + birthdate);
    });
  }
};

export { _Signup };
