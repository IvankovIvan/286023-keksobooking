'use strict';

(function () {
  // добавления данных о предложениях
  var addOffer = function (offerCurrent, article) {
    var fragment = document.createDocumentFragment();
    article.querySelector('.popup__avatar').src = offerCurrent.author.avatar;
    article.querySelector('h3').textContent = offerCurrent.offer.title;
    article.querySelector('p small').textContent = offerCurrent.offer.address;
    article.querySelector('.popup__price').innerHTML = offerCurrent.offer.price + '&#x20bd;/ночь';
    window.data.getHouses.forEach(function (house) {
      if (house.type === offerCurrent.offer.type) {
        article.querySelector('h4').textContent = house.typeRus;
      }
    });
    article.querySelector('p:nth-of-type(3)').textContent = offerCurrent.offer.rooms + ' комнаты для ' + offerCurrent.offer.guests + ' гостей';
    article.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + offerCurrent.offer.checkin + ', выезд до ' + offerCurrent.offer.checkout;

    var popupFeatures = article.querySelector('.popup__features');
    window.data.getFeatures.forEach(function (feature) {
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

    return fragment.appendChild(article);
  };

  window.card = {
    addOffer: addOffer
  };
})();
