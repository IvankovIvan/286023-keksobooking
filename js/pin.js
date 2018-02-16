'use strict';

(function () {

  var SHIFT_Y = -35;

  // добавления кнопок аватаров
  var addButtonsAvatar = function (mapPin) {
    var fragment = document.createDocumentFragment();
    window.data.offers.forEach(function (offer, i) {
      mapPin.style.left = offer.location.x + 'px';
      mapPin.style.top = offer.location.y + SHIFT_Y + 'px';
      mapPin.dataset.id = i;
      mapPin.querySelector('img').src = offer.author.avatar;
      fragment.appendChild(mapPin.cloneNode(true));
    });
    var divButtonPing = document.querySelector('.map__pins');
    divButtonPing.appendChild(fragment);
  };

  window.pin = {
    addButtonsAvatar: addButtonsAvatar
  };
})();
