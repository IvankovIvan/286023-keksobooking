'use strict';

(function () {

  var AVATAR_MIN_NUMBER = 1;
  var AVATAR_MAX_NUMBER = 8;
  var OFFERS_COUNT = 8;
  var PHOTOS_MIN = 1;
  var PHOTOS_MAX = 3;
  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;
  var LOCATION_Y_MIN = 150;
  var LOCATION_Y_MAX = 500;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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
  // возвращает url аватара
  var getAvatarUrl = function (number) {
    return 'img/avatars/user0' + number + '.png';
  };

  var getPhotoArr = function () {
    var arrSequence = window.util.createArraySequence(PHOTOS_MIN, PHOTOS_MAX);
    var arrPhoto = new Array(arrSequence.length);
    for (var i = 0; arrSequence.length > 0; i++) {
      arrPhoto[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + window.util.getArrayValue(arrSequence) + '.jpg';
    }
    return arrPhoto;
  };

  // создания предложения
  var createOfferNew = function (avatarNumberFreeArray) {
    var x = window.util.getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX);
    var y = window.util.getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
    return {
      author: {
        avatar: getAvatarUrl(window.util.getArrayValue(avatarNumberFreeArray))
      },
      offer: {
        title: window.util.getArrayValue(titles),
        address: x + ', ' + y,
        price: window.util.getRandomInt(PRICE_MIN, PRICE_MAX),
        type: HOUSES[window.util.getRandomInt(0, HOUSES.length - 1)].type,
        rooms: window.util.getRandomInt(ROOMS_MIN, ROOMS_MAX),
        guests: window.util.getRandomInt(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECKINS[window.util.getRandomInt(0, CHECKINS.length - 1)],
        checkout: CHECKOUTS[window.util.getRandomInt(0, CHECKOUTS.length - 1)],
        features: FEATURES.slice(0, window.util.getRandomInt(0, FEATURES.length)),
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

  var getMinPriceByType = function (type) {
    var minValue = 0;
    HOUSES.forEach(function (house) {
      if (house.type === type) {
        minValue = house.priceMin;
      }
    });
    return minValue;
  };

  // последовательность свободных номеров аватаров
  var avatarNumberFreeArray = window.util.createArraySequence(AVATAR_MIN_NUMBER, AVATAR_MAX_NUMBER);
  // создания массива предлоежений
  var offers = createOffers(avatarNumberFreeArray);

  window.data = {
    offers: offers,
    getMinPriceByType: getMinPriceByType,
    getFeatures: FEATURES,
    getHouses: HOUSES
  };
})();
