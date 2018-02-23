'use strict';

(function () {

  var SHIFT_Y = -35;

  // добавления кнопок аватаров
  var addButtonsAvatar = function (offers) {
    var mapPin = window.map.mapPinTemplate;
    var fragment = document.createDocumentFragment();
    offers.forEach(function (offer, i) {
      mapPin.style.left = offer.location.x + 'px';
      mapPin.style.top = offer.location.y + SHIFT_Y + 'px';
      mapPin.dataset.id = i;
      mapPin.querySelector('img').src = offer.author.avatar;
      fragment.appendChild(mapPin.cloneNode(true));
    });
    var divButtonPing = document.querySelector('.map__pins');
    divButtonPing.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (value) {
      value.remove();
    });
    divButtonPing.appendChild(fragment);
  };

  var changeFilter = function () {
    addButtonsAvatar(window.data.getOffersByFilters(window.util.getValueFromForm(mapFilters)));
  };

  var mapFilters = document.querySelector('.map__filters');

  mapFilters.addEventListener('change', function () {
    window.debounce(changeFilter);
  });

  window.pin = {
    addButtonsAvatar: addButtonsAvatar
  };
})();
