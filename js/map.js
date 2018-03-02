'use strict';

(function () {

  var KEY_ESC = 27;

  var map = document.querySelector('.map');
  var template = document.querySelector('template').content;
  var mapPinTemplate = template.querySelector('.map__pin');
  var mapPinMain = map.querySelector('.map__pin--main');

  var onClosePopupClick = function () {
    removeOffer();
  };

  var onEscKeydown = function (evt) {
    if (evt.keyCode === KEY_ESC) {
      onClosePopupClick();
    }
  };

  var onAvatarClick = function (evt) {
    removeOffer();
    var button = evt.target.closest('.map__pin');
    if (button && button.tagName === 'BUTTON' && button.dataset.id) {
      map.appendChild(window.card.addOffer(window.data.offers[button.dataset.id], template.querySelector('article.map__card').cloneNode(true)));
      map.querySelector('.popup__close').addEventListener('click', onClosePopupClick);
      document.addEventListener('keydown', onEscKeydown);
    }
  };

  var addDivAvatarClick = function () {
    map.querySelector('.map__pins').addEventListener('click', onAvatarClick);
  };

  var removeOffer = function () {
    if (map.querySelector('.map__card')) {
      map.querySelector('.popup__close').removeEventListener('click', onClosePopupClick);
      map.querySelector('.map__card').remove();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  var render = function (offers) {
    window.data.addOffers(offers);
    map.classList.remove('map--faded');
    window.pin.addButtonsAvatar(window.data.getOffers());
    addDivAvatarClick();
    window.form.toggle();
  };

  var reset = function () {
    mapPinMain.style.left = mapPinMainDefaultValue.left;
    mapPinMain.style.top = mapPinMainDefaultValue.top;
    map.classList.add('map--faded');
    mapPinMain.addEventListener('mouseup', onViewMapEnable);
    window.pin.removeMapFiltersEventListener();
  };

  var onViewMapEnable = function () {
    window.backend.load(render, window.util.errorHandler);
    mapPinMain.removeEventListener('mouseup', onViewMapEnable);
    window.pin.addMapFiltersEventListener();
    window.dragdrop.create(mapPinMain, map, window.form.address, window.data.rectPoint);
  };

  var mapPinMainDefaultValue = {
    left: mapPinMain.style.left,
    top: mapPinMain.style.top
  };

  mapPinMain.addEventListener('mouseup', onViewMapEnable);

  window.map = {
    mapPinTemplate: mapPinTemplate,
    removeOffer: removeOffer,
    reset: reset
  };
})();
