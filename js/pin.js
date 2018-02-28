'use strict';

(function () {

  var SHIFT_Y = -35;

  // добавления кнопок аватаров
  var addButtonsAvatar = function (offers) {
    var divButton = document.querySelector('.map__pins');
    divButton.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (value) {
      value.remove();
    });
    var map = window.map.mapPinTemplate;
    var fragment = document.createDocumentFragment();
    offers.forEach(function (offer) {
      map.style.left = offer.location.x + 'px';
      map.style.top = offer.location.y + SHIFT_Y + 'px';
      map.dataset.id = offer.id;
      map.querySelector('img').src = offer.author.avatar;
      fragment.appendChild(map.cloneNode(true));
    });
    divButton.appendChild(fragment);
  };

  var changeFilter = function () {
    addButtonsAvatar(window.data.getOffersByFilters(window.util.getValueFromForm(mapFilters)));
  };

  var mapFilters = document.querySelector('.map__filters');

  mapFilters.addEventListener('change', function () {
    window.debounce(changeFilter);
  });

  window.pin = {
    addButtonsAvatar: changeFilter
  };
})();
