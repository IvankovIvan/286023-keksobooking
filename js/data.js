'use strict';

(function () {

  var Location = {
    X_MIN: 300,
    X_MAX: 900,
    Y_MIN: 150,
    Y_MAX: 500
  };

  var Price = {
    LOW: 10000,
    HIGH: 50000
  };

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

  var offers = [];
  var addOffers = function (offersArr) {
    offersArr.forEach(function (value, i) {
      value.id = i;
      offers.push(value);
    });
  };

  var getOffers = function () {
    return offers.slice(0, 3);
  };

  var getFilterPrice = function (filterPrice) {
    return function (offerPrice) {
      switch (filterPrice.value.toUpperCase()) {
        case 'LOW':
          return offerPrice.offer.price < Price.LOW;
        case 'HIGH':
          return offerPrice.offer.price > Price.HIGH;
        case 'MIDDLE':
          return offerPrice.offer.price >= Price.LOW && offerPrice.offer.price <= Price.HIGH;
      }
      return false;
    };
  };

  var getFilterToField = function (filter) {
    return filter.substring(filter.indexOf('-') + 1);
  };

  var getFilter = function (filterCurrent) {
    if (filterCurrent.id[0] === 'f') {
      return function (value) {
        return value.offer.features.indexOf(getFilterToField(filterCurrent.id)) > -1;
      };
    } else {
      // Если проверяем цену
      if (getFilterToField(filterCurrent.id) === 'price') {
        return getFilterPrice(filterCurrent);
      } else {
        return function (value) {
          return value.offer[getFilterToField(filterCurrent.id)].toString() === filterCurrent.value;

        };
      }
    }
  };

  var filterOffers = function (offersCurrent, filterCurrent) {
    if (filterCurrent.value === 'any' || filterCurrent.value === false) {
      return offersCurrent;
    }
    return offersCurrent.filter(getFilter(filterCurrent));
  };

  var getOffersByFilters = function (filters) {
    var newOffers = offers.slice();
    filters.forEach(function (value) {
      newOffers = filterOffers(newOffers, value);
    });
    if (newOffers.length > 5) {
      newOffers = newOffers.slice(0, 5);
    }
    return newOffers;
  };

  window.data = {
    offers: offers,
    getOffers: getOffers,
    getOffersByFilters: getOffersByFilters,
    getMinPriceByType: getMinPriceByType,
    getFeatures: FEATURES,
    getHouses: HOUSES,
    rectPoint: {
      left: Location.X_MIN,
      right: Location.X_MAX,
      top: Location.Y_MIN,
      bottom: Location.Y_MAX
    },
    addOffers: addOffers
  };
})();
