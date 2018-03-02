'use strict';

(function () {

  var INTERVAL = 500;

  var lastTimeout;

  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, INTERVAL);
  };
})();

