'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';

  var loadData = function (onSuccess, onError, method, body) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа:' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'mc');
    });

    xhr.timeout = 10000;

    var url;
    switch (method) {
      case 'GET' :
        url = URL_LOAD;
        break;
      case 'POST' :
        url = URL_SAVE;
        break;
      default:
        onError('Ошибка.');
        return;
    }
    xhr.open(method, url);
    xhr.send(body);
  };

  window.backend = {
    load: function (onSuccess, onError) {
      loadData(onSuccess, onError, 'GET', null);
    },
    save: function (onSuccess, onError, body) {
      loadData(onSuccess, onError, 'POST', body);
    }
  };
})();
