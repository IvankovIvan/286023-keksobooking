'use strict';

(function () {

  var OFFERS_COUNT = 8;
  var AVATAR_MIN_NUMBER = 1;
  var AVATAR_MAX_NUMBER = 8;
  var FIRST_POINT = {x: 377, y: 430};
  var HOUSES = [
    {
      type: 'flat',
      typeRus: 'Квартира',
      priceMin: 1000
    },
    {
      type: 'bungalo',
      typeRus: 'Бунгало',
      priceMin: 0
    },
    {
      type: 'house',
      typeRus: 'Дом',
      priceMin: 5000
    },
    {
      type: 'palace',
      typeRus: 'Дворец',
      priceMin: 10000
    }];
  var ROOM_VS_GUESTS = {'1': [1], '2': [1, 2], '3': [1, 2, 3], '100': [0]};
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var SHIFT_Y = -35;
  var TITLE_TEXT_INVALID = 'Введите заголовок.';
  var PRICE_TEXT_INVALID = 'Введите цену.';

  // создания массива предлоежений
  var createOffers = function (avatarNumberFreeArray) {
    var offers = new Array(OFFERS_COUNT);
    for (var i = 0; i < offers.length; i++) {
      offers[i] = window.data.createOfferNew(avatarNumberFreeArray);
    }
    return offers;
  };

  // добавления кнопок аватаров
  var addButtonsAvatar = function () {
    var fragment = document.createDocumentFragment();
    var button = template.querySelector('.map__pin');
    offers.forEach(function (offer, i) {
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
        addOffer(id);
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

  // добавления данных о предложениях
  var addOffer = function (idOffer) {
    var fragment = document.createDocumentFragment();
    var offerCurrent = offers[idOffer];
    var article = template.querySelector('article.map__card').cloneNode(true);
    article.querySelector('.popup__avatar').src = offerCurrent.author.avatar;
    article.querySelector('h3').textContent = offerCurrent.offer.title;
    article.querySelector('p small').textContent = offerCurrent.offer.address;
    article.querySelector('.popup__price').innerHTML = offerCurrent.offer.price + '&#x20bd;/ночь';
    HOUSES.forEach(function (house) {
      if (house.type === offerCurrent.offer.type) {
        article.querySelector('h4').textContent = house.typeRus;
      }
    });
    article.querySelector('p:nth-of-type(3)').textContent = offerCurrent.offer.rooms + ' комнаты для ' + offerCurrent.offer.guests + ' гостей';
    article.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + offerCurrent.offer.checkin + ', выезд до ' + offerCurrent.offer.checkout;

    var popupFeatures = article.querySelector('.popup__features');
    FEATURES.forEach(function (feature) {
      if (offerCurrent.offer.features.indexOf(feature) < 0) {
        popupFeatures.removeChild(popupFeatures.querySelector('.feature--' + feature));
      }
    });

    article.querySelector('p:nth-of-type(5)').textContent = offerCurrent.offer.description;

    var popupPictures = article.querySelector('.popup__pictures');
    offerCurrent.offer.photos.forEach(function (photo) {
      var liNode = popupPictures.querySelector('li').cloneNode(true);
      var img = liNode.querySelector('img');
      img.src = photo;
      img.height = '50';
      img.width = '50';
      popupPictures.appendChild(liNode);
    });
    popupPictures.removeChild(popupPictures.querySelector('li'));

    fragment.appendChild(article);
    map.appendChild(fragment);
  };

  var enableViewMap = function () {
    map.classList.remove('map--faded');
    notice.querySelector('.notice__form').classList.remove('notice__form--disabled');
    notice.querySelectorAll('fieldset').forEach(function (note) {
      note.classList.remove('disabled');
    });
    addButtonsAvatar();
    addDivAvatarClick();
    onPriceValid();
    onTitleValid();
  };

  var onRoomNumberInput = function (evt) {
    var roomNumberCurrent = evt.target;
    var capacityValue = notice.querySelector('#capacity');
    capacityValue.querySelectorAll('option').forEach(function (option) {
      option.disabled = (ROOM_VS_GUESTS[roomNumberCurrent.value].indexOf(parseInt(option.value, 10)) < 0);
    });
    var optionSelected = capacityValue.querySelector('option:checked');
    if (optionSelected.disabled) {
      optionSelected.selected = false;
      capacityValue.querySelector('option:enabled').selected = true;
    }
  };

  var checkElementValue = function (node, value, min, max) {
    if (value < min || value > max) {
      node.style.border = 'thin dotted red';
    } else {
      node.style.border = '';
    }
  };

  var validElement = function (node, min, max, textInvalid) {
    if (node.value === '') {
      checkElementValue(node, -1, min, max);
      price.setCustomValidity(textInvalid);
    } else {
      price.setCustomValidity('');
    }
  };

  var onPriceValid = function () {
    validElement(price, price.min, price.max, PRICE_TEXT_INVALID);
  };

  var onTitleValid = function () {
    validElement(title, title.minLength, title.maxLength, TITLE_TEXT_INVALID);
  };

  // последовательность свободных номеров аватаров
  var avatarNumberFreeArray = window.util.createArraySequence(AVATAR_MIN_NUMBER, AVATAR_MAX_NUMBER);
  // создания массива предлоежений
  var offers = createOffers(avatarNumberFreeArray);

  var map = document.querySelector('.map');
  var notice = document.querySelector('.notice');
  notice.querySelector('#address').value = 'x: ' + FIRST_POINT.x + '; y: ' + FIRST_POINT.y;
  var mapPinMain = map.querySelector('.map__pin--main');
  mapPinMain.addEventListener('mouseup', enableViewMap);

  var template = document.querySelector('template').content;
  var divButtonPing = document.querySelector('.map__pins');

  var title = notice.querySelector('#title');
  title.addEventListener('input', function () {
    checkElementValue(title, title.value.length, title.minLength, title.maxLength);
  });

  var price = notice.querySelector('#price');
  notice.querySelector('#type').addEventListener('change', function (evt) {
    HOUSES.forEach(function (house) {
      if (house.type === evt.target.value) {
        price.min = house.priceMin;
      }
    });
  });

  price.addEventListener('input', function () {
    checkElementValue(price, parseInt(price.value, 10), price.min, price.max);
  });

  price.addEventListener('invalid', onPriceValid);

  notice.querySelector('#room_number').addEventListener('input', onRoomNumberInput);

  var timeIn = notice.querySelector('#timein');
  var timeOut = notice.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  });

  timeOut.addEventListener('change', function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  });

})();
