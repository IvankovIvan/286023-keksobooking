'use strict';

(function () {

  var SHIFT_Y = -35;

  var divButton = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');

  var removeAll = function () {
    divButton.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (value) {
      value.remove();
    });
  };

  // добавления кнопок аватаров
  var addButtonsAvatar = function (offers) {
    removeAll();
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
    window.map.removeOffer();
    addButtonsAvatar(window.data.getOffersByFilters(window.util.getValueFromForm(mapFilters)));
  };

  var onMapFilterChange = function () {
    window.debounce(changeFilter);
  };

  var addMapFiltersEventListener = function () {
    mapFilters.addEventListener('change', onMapFilterChange);
  };

  var removeMapFiltersEventListener = function () {
    mapFilters.removeEventListener('change', onMapFilterChange);
  };

  window.pin = {
    addButtonsAvatar: changeFilter,
    removeAll: removeAll,
    addMapFiltersEventListener: addMapFiltersEventListener,
    removeMapFiltersEventListener: removeMapFiltersEventListener
  };
})();
