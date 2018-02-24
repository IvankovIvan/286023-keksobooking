'use strict';

(function () {

  var Location = {
    X_MIN: 300,
    X_MAX: 900,
    Y_MIN: 150,
    Y_MAX: 500
  };

  var dicFiltersToOffers = {
    'housing-type': 'type',
    'housing-price': 'price',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests',
    'filter-wifi': 'wifi',
    'filter-dishwasher': 'dishwasher',
    'filter-parking': 'parking',
    'filter-washer': 'washer',
    'filter-elevator': 'elevator',
    'filter-conditioner': 'conditioner'
  };

  var dicPrice = {
    'middle': 'MIDDLE',
    'low': 'LOW',
    'high': 'HIGH'
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

  var filterOffers = function (offersCurrent, filterCurrent) {
    if (filterCurrent.value === 'any' || filterCurrent.value === false) {
      return offersCurrent;
    }
    if (filterCurrent.id[0] === 'f') {
      return offersCurrent.filter(function (value) {
        return value.offer.features.indexOf(dicFiltersToOffers[filterCurrent.id]) > -1;
      });
    } else {
      // Если проверяем цену
      if (dicFiltersToOffers[filterCurrent.id] === 'price') {
        // Если цена меньше минимальной
        if (dicPrice[filterCurrent.value] === 'LOW') {
          return offersCurrent.filter(function (value) {
            return value.offer.price < Price.LOW;
          });
        } else if (dicPrice[filterCurrent.value] === 'HIGH') { // если цена больше
          return offersCurrent.filter(function (value) {
            return value.offer.price > Price.HIGH;
          });
        } else if (dicPrice[filterCurrent.value] === 'MIDDLE') { // если в промежутке
          return offersCurrent.filter(function (value) {
            return (value.offer.price <= Price.HIGH && value.offer.price >= Price.LOW);
          });
        }
      } else {
        return offersCurrent.filter(function (value) {
          return value.offer[dicFiltersToOffers[filterCurrent.id]].toString() === filterCurrent.value;
        });
      }
    }
    return offersCurrent;
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
