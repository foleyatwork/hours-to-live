import { _Countdown } from './_Countdown';
import { _Signup } from './_Signup';

var Templates = {
  _Countdown: _Countdown,
  _Signup: _Signup,
  render: function(_template, node, args) {
    var template = Templates[_template] || Templates['_' + _template];

    if (!template) {
      return;
    }

    node.innerHTML = template._getTemplate.apply(template, args);
    setTimeout(template._renderFn, 0);
  }
};

export { Templates };
