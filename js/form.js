'use strict';

(function () {

  var FIRST_POINT = {x: 377, y: 430};
  var ROOM_VS_GUESTS = {'1': [1], '2': [1, 2], '3': [1, 2, 3], '100': [0]};
  var PRICE_TEXT_INVALID = 'Введите цену.';
  var TITLE_TEXT_INVALID = 'Введите заголовок.';

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

  var onPriceValid = function () {
    window.util.validElement(price, price.min, price.max, PRICE_TEXT_INVALID);
  };

  var onTitleValid = function () {
    window.util.validElement(title, title.minLength, title.maxLength, TITLE_TEXT_INVALID);
  };

  var notice = document.querySelector('.notice');

  var title = notice.querySelector('#title');

  // ввод заголовка
  title.addEventListener('input', function () {
    window.util.validElement(title, title.minLength, title.maxLength, TITLE_TEXT_INVALID);
  });

  var address = notice.querySelector('#address');
  address.value = 'x: ' + FIRST_POINT.x + '; y: ' + FIRST_POINT.y;

  var price = notice.querySelector('#price');

  // изменения типа жилья
  notice.querySelector('#type').addEventListener('change', function (evt) {
    price.min = window.data.getMinPriceByType(evt.target.value);
  });

  price.addEventListener('input', function () {
    window.util.checkElementValue(price, parseInt(price.value, 10), price.min, price.max);
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

  var form = notice.querySelector('.notice__form');

  var resetForm = function () {
    mainData.forEach(function (valueCurrent) {
      notice.querySelector('#' + valueCurrent.id)[valueCurrent.key] = valueCurrent.value;
    });
  };

  form.addEventListener('submit', function (evt) {
    var data = new FormData(form);
    window.backend.save(resetForm, window.util.errorHandler, data);
    evt.preventDefault();
  });

  form.querySelector('.form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });


  var createDefaultValue = function () {
    form.querySelectorAll('[name]').forEach(function (value) {
      var valueCurent = {};
      switch (value.tagName.toLocaleLowerCase()) {
        case 'input':
          if (value.type === 'checkbox') {
            valueCurent = {id: value.id, type: 'input', key: 'checked', value: value.checked};
          } else {
            valueCurent = {id: value.id, type: 'input', key: 'value', value: value.value};
          }
          break;
        case 'select':
          valueCurent = {id: value.id, type: 'select', key: 'value', value: value.value};
          break;
        case 'textarea':
          valueCurent = {id: value.id, type: 'textarea', key: 'value', value: value.value};
          break;
        default:
      }
      if (value.id !== 'address') {
        mainData.push(valueCurent);
      }
    });
  };

  var mainData = [];
  createDefaultValue();

  window.form = {
    show: function () {
      form.classList.remove('notice__form--disabled');
      notice.querySelectorAll('fieldset').forEach(function (note) {
        note.disabled = false;
      });
      onPriceValid();
      onTitleValid();
    },
    address: address
  };
})();
