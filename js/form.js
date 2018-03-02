'use strict';

(function () {

  var DEFAULT_POINT = {x: 377, y: 430};
  var ROOM_VS_GUESTS = {'1': [1], '2': [1, 2], '3': [1, 2, 3], '100': [0]};

  var TextInvalid = {
    PRICE: 'Введите цену.',
    TITLE: 'Введите заголовок.'
  };

  var notice = document.querySelector('.notice');
  var title = notice.querySelector('#title');
  var address = notice.querySelector('#address');
  var price = notice.querySelector('#price');
  var timeIn = notice.querySelector('#timein');
  var timeOut = notice.querySelector('#timeout');
  var noticeForm = notice.querySelector('.notice__form');
  var mainData = [];

  // управление кол-вом гостей в зависимости от кол-ва комнат
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

  // проверка валидности цены
  var onPriceValid = function () {
    window.util.validElement(price, price.min, price.max, TextInvalid.PRICE);
  };

  // установка значений по умолчанию главного пина
  var setDefaultPoint = function () {
    address.value = 'x: ' + DEFAULT_POINT.x + '; y: ' + DEFAULT_POINT.y;
  };

  var resetValue = function () {
    mainData.forEach(function (valueCurrent) {
      notice.querySelector('#' + valueCurrent.id)[valueCurrent.key] = valueCurrent.value;
    });
  };

  var createDefaultValue = function () {
    window.util.getValueFromForm(noticeForm).forEach(function (value) {
      if (value.id !== 'address') {
        mainData.push(value);
      }
    });
  };

  var toggle = function () {
    noticeForm.classList.toggle('notice__form--disabled');
    notice.querySelectorAll('fieldset').forEach(function (note) {
      note.disabled = !note.disabled;
    });
    if (noticeForm.classList.contains('notice__form--disabled')) {
      noticeForm.removeEventListener('submit', onSubmit);
      title.removeEventListener('input', onTitleInput);
      noticeForm.querySelector('.form__reset').removeEventListener('click', onReset);
      notice.querySelector('#type').removeEventListener('change', onTypeChange);
      price.removeEventListener('input', onPriceInput);
      price.removeEventListener('invalid', onPriceValid);
      notice.querySelector('#room_number').removeEventListener('input', onRoomNumberInput);
      timeIn.removeEventListener('change', onTimeInChange);
      timeOut.removeEventListener('change', onTimeOutChange);
    } else {
      noticeForm.addEventListener('submit', onSubmit);
      title.addEventListener('input', onTitleInput);
      noticeForm.querySelector('.form__reset').addEventListener('click', onReset);
      notice.querySelector('#type').addEventListener('change', onTypeChange);
      price.addEventListener('input', onPriceInput);
      price.addEventListener('invalid', onPriceValid);
      notice.querySelector('#room_number').addEventListener('input', onRoomNumberInput);
      timeIn.addEventListener('change', onTimeInChange);
      timeOut.addEventListener('change', onTimeOutChange);
    }
  };

  var reset = function () {
    resetValue();
    window.pin.removeAll();
    toggle();
    window.map.reset();
    setDefaultPoint();
  };

  var onReset = function (evt) {
    evt.preventDefault();
    reset();
  };

  var onSubmit = function (evt) {
    var data = new FormData(noticeForm);
    evt.preventDefault();
    window.backend.save(reset, window.util.errorHandler, data);
  };

  // изменения типа жилья
  var onTypeChange = function (evt) {
    price.min = window.data.getMinPriceByType(evt.target.value);
  };

  // ввод заголовка
  var onTitleInput = function () {
    window.util.validElement(title, title.minLength, title.maxLength, TextInvalid.TITLE);
  };

  var onPriceInput = function () {
    window.util.checkElementValue(price, parseInt(price.value, 10), price.min, price.max);
  };

  var onTimeInChange = function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  };

  var onTimeOutChange = function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  };

  setDefaultPoint();
  createDefaultValue();

  window.form = {
    toggle: toggle,
    address: address
  };
})();
