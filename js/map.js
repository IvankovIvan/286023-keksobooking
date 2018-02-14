'use strict';

(function () {

  var map = document.querySelector('.map');
  var template = document.querySelector('template').content;

  var onClosePopupClick = function () {
    removeOffer();
  };

  var onAvatarClick = function (evt) {
    removeOffer();
    var button = evt.target.closest('.map__pin');
    if (button && button.tagName === 'BUTTON') {
      var id = evt.target.closest('.map__pin').dataset.id || -1;
      if (id > -1) {
        map.appendChild(window.card.addOffer(window.data.offers[id], template.querySelector('article.map__card').cloneNode(true)));
        map.querySelector('.popup__close').addEventListener('click', onClosePopupClick);
      }
    }
  };

  var addDivAvatarClick = function () {
    map.querySelector('.map__pins').addEventListener('click', onAvatarClick);
  };

  var removeOffer = function () {
    if (map.querySelector('.map__card')) {
      map.querySelector('.popup__close').removeEventListener('click', onClosePopupClick);
      map.querySelector('.map__card').remove();
    }
  };

  var enableViewMap = function () {
    map.classList.remove('map--faded');
    window.pin.addButtonsAvatar(template.querySelector('.map__pin'));
    addDivAvatarClick();
    window.form.enadled();
  };

  var mapPinMain = map.querySelector('.map__pin--main');
  mapPinMain.addEventListener('mouseup', enableViewMap);

})();
