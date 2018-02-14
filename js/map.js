'use strict';

(function () {
  var FIRST_POINT = {x: 377, y: 430};
  var SHIFT_Y = -35;

  // добавления кнопок аватаров
  var addButtonsAvatar = function () {
    var fragment = document.createDocumentFragment();
    var button = template.querySelector('.map__pin');
    window.data.offers.forEach(function (offer, i) {
      button.style.left = offer.location.x + 'px';
      button.style.top = offer.location.y + SHIFT_Y + 'px';
      button.dataset.id = i;
      button.querySelector('img').src = offer.author.avatar;
      fragment.appendChild(button.cloneNode(true));
    });
    divButtonPing.appendChild(fragment);
  };

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
    notice.querySelector('.notice__form').classList.remove('notice__form--disabled');
    notice.querySelectorAll('fieldset').forEach(function (note) {
      note.classList.remove('disabled');
    });
    addButtonsAvatar();
    addDivAvatarClick();
    window.form.open();
  };

  var map = document.querySelector('.map');
  var notice = document.querySelector('.notice');
  notice.querySelector('#address').value = 'x: ' + FIRST_POINT.x + '; y: ' + FIRST_POINT.y;
  var mapPinMain = map.querySelector('.map__pin--main');
  mapPinMain.addEventListener('mouseup', enableViewMap);

  var template = document.querySelector('template').content;
  var divButtonPing = document.querySelector('.map__pins');
})();
