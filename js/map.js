'use strict';

var OFFERS_COUNT = 8;
var AVATAR_MIN_NUMBER = 1;
var AVATAR_MAX_NUMBER = 8;
var LOCATION_X_MIN = 300;
var LOCATION_X_MAX = 900;
var LOCATION_Y_MIN = 150;
var LOCATION_Y_MAX = 500;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var HOUSES_TYPE = ['flat', 'house', 'bungalo'];
var HOUSES_TYPE_RUS = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом'};
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_MIN = 1;
var PHOTOS_MAX = 3;
var SHIFT_Y = -35;

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// возвращает массив последовательность чисел
var createArraySequence = function (min, max) {
  var arrayNew = new Array(max - min + 1);
  for (var i = 0; i < arrayNew.length; i++) {
    arrayNew[i] = min + i;
  }
  return arrayNew;
};

// возвращает url аватара
var getAvatarUrl = function (number) {
  return 'img/avatars/user0' + number + '.png';
};

// возвращает одно рандомное значение из массива с удалением значения из массива
var getArrayValue = function (arr) {
  var number = getRandomInt(0, arr.length - 1);
  return arr.splice(number, 1)[0];
};

var getPhotoArr = function () {
  var arrSequence = createArraySequence(PHOTOS_MIN, PHOTOS_MAX);
  var arrPhoto = new Array(arrSequence.length);
  for (var i = 0; arrSequence.length > 0; i++) {
    arrPhoto[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + getArrayValue(arrSequence) + '.jpg';
  }
  return arrPhoto;
};

// создания предложения
var createOfferNew = function (avatarNumberFreeArray) {
  var x = getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX);
  var y = getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
  return {
    author: {
      avatar: getAvatarUrl(getArrayValue(avatarNumberFreeArray))
    },
    offer: {
      title: getArrayValue(titles),
      address: x + ', ' + y,
      price: getRandomInt(PRICE_MIN, PRICE_MAX),
      type: HOUSES_TYPE[getRandomInt(0, HOUSES_TYPE.length - 1)],
      rooms: getRandomInt(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomInt(GUESTS_MIN, GUESTS_MAX),
      checkin: CHECKINS[getRandomInt(0, CHECKINS.length - 1)],
      checkout: CHECKOUTS[getRandomInt(0, CHECKOUTS.length - 1)],
      features: FEATURES.slice(0, getRandomInt(0, FEATURES.length)),
      description: '',
      photos: getPhotoArr()
    },
    location: {
      x: x,
      y: y
    }
  };
};

// создания массива предлоежений
var createOffers = function (avatarNumberFreeArray) {
  var offers = new Array(OFFERS_COUNT);
  for (var i = 0; i < offers.length; i++) {
    offers[i] = createOfferNew(avatarNumberFreeArray);
  }
  return offers;
};

// добавления кнопок аватаров
var addButtonsAvatar = function () {
  var fragment = document.createDocumentFragment();
  var button = template.querySelector('.map__pin');
  offers.forEach(function (offer) {
    button.style.left = offer.location.x + 'px';
    button.style.top = offer.location.y + SHIFT_Y + 'px';
    button.querySelector('img').src = offer.author.avatar;
    fragment.appendChild(button.cloneNode(true));
  });
  divButtonPing.appendChild(fragment);
};

// добавления данных о предложениях
var addOffers = function () {
  var fragment = document.createDocumentFragment();
  var divMap = document.querySelector('.map');
  offers.forEach(function (offer) {
    var article = template.querySelector('article.map__card').cloneNode(true);
    article.querySelector('.popup__avatar').src = offer.author.avatar;
    article.querySelector('h3').textContent = offer.offer.title;
    article.querySelector('p small').textContent = offer.offer.address;
    article.querySelector('.popup__price').innerHTML = offer.offer.price + '&#x20bd;/ночь';
    article.querySelector('h4').textContent = HOUSES_TYPE_RUS[offer.offer.type];
    article.querySelector('p:nth-of-type(3)').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    article.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;

    var popupFeatures = article.querySelector('.popup__features');
    FEATURES.forEach(function (feature) {
      if (offer.offer.features.indexOf(feature) < 0) {
        popupFeatures.removeChild(popupFeatures.querySelector('.feature--' + feature));
      }
    });

    article.querySelector('p:nth-of-type(5)').textContent = offer.offer.description;

    var popupPictures = article.querySelector('.popup__pictures');
    offer.offer.photos.forEach(function (photo) {
      var liNode = popupPictures.querySelector('li').cloneNode(true);
      var img = liNode.querySelector('img');
      img.src = photo;
      img.height = '50';
      img.width = '50';
      popupPictures.appendChild(liNode);
    });
    popupPictures.removeChild(popupPictures.querySelector('li'));

    fragment.appendChild(article);
    divMap.appendChild(fragment);
  });
};

// последовательность свободных номеров аватаров
var avatarNumberFreeArray = createArraySequence(AVATAR_MIN_NUMBER, AVATAR_MAX_NUMBER);
// создания массива предлоежений
var offers = createOffers(avatarNumberFreeArray);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var template = document.querySelector('template').content;
var divButtonPing = document.querySelector('.map__pins');

addButtonsAvatar();
addOffers();
