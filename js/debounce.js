'use strict';

(function () {

  var DEBOUCE_INTERVAL = 500;

  var lastTimeout;
  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUCE_INTERVAL);
  };
})();

