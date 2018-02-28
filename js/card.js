'use strict';

(function () {

  // добавления данных о предложениях
  var addOffer = function (offerCurrent, article) {
    var fragment = document.createDocumentFragment();
    article.querySelector('.popup__avatar').src = offerCurrent.author.avatar;
    var offer = offerCurrent.offer;
    article.querySelector('h3').textContent = offer.title;
    article.querySelector('p small').textContent = offer.address;
    article.querySelector('.popup__price').innerHTML = offer.price + '&#x20bd;/ночь';
    window.data.getHouses.forEach(function (house) {
      if (house.type === offer.type) {
        article.querySelector('h4').textContent = house.typeRus;
      }
    });
    article.querySelector('p:nth-of-type(3)').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    article.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

    var popupFeatures = article.querySelector('.popup__features');
    window.data.getFeatures.forEach(function (feature) {
      if (offer.features.indexOf(feature) < 0) {
        popupFeatures.removeChild(popupFeatures.querySelector('.feature--' + feature));
      }
    });

    article.querySelector('p:nth-of-type(5)').textContent = offer.description;

    var popupPictures = article.querySelector('.popup__pictures');
    offer.photos.forEach(function (photo) {
      var liNode = popupPictures.querySelector('li').cloneNode(true);
      var img = liNode.querySelector('img');
      img.src = photo;
      img.height = '50';
      img.width = '50';
      popupPictures.appendChild(liNode);
    });
    popupPictures.removeChild(popupPictures.querySelector('li'));

    return fragment.appendChild(article);
  };

  window.card = {
    addOffer: addOffer
  };
})();
