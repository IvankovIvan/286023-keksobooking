'use strict';

(function () {

  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;
  var LOCATION_Y_MIN = 150;
  var LOCATION_Y_MAX = 500;
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

  var getMinPriceByType = function (type) {
    var minValue = 0;
    HOUSES.forEach(function (house) {
      if (house.type === type) {
        minValue = house.priceMin;
      }
    });
    return minValue;
  };

  var offers = []; // = createOffers(avatarNumberFreeArray);

  var addOffers = function (offersArr) {
    offersArr.forEach(function (value) {
      offers.push(value);
    });
  };

  window.data = {
    offers: offers,
    getMinPriceByType: getMinPriceByType,
    getFeatures: FEATURES,
    getHouses: HOUSES,
    rectPoint: {
      left: LOCATION_X_MIN,
      right: LOCATION_X_MAX,
      top: LOCATION_Y_MIN,
      bottom: LOCATION_Y_MAX
    },
    addOffers: addOffers
  };
})();
