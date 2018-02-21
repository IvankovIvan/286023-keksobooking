'use strict';

(function () {

  // Возвращает случайное целое число между min (включительно) и max (не включая max)
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var checkElementValue = function (node, value, min, max) {
    if (parseInt(value, 10) < min || parseInt(value, 10) > max) {
      node.style.border = 'thin dotted red';
      return false;
    }
    node.style.border = '';
    return true;
  };

  var createErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.util = {
    getRandomInt: getRandomInt,
    // возвращает массив последовательность чисел
    createArraySequence: function (min, max) {
      var arrayNew = new Array(max - min + 1);
      for (var i = 0; i < arrayNew.length; i++) {
        arrayNew[i] = min + i;
      }
      return arrayNew;
    },
    // возвращает одно рандомное значение из массива с удалением значения из массива
    getArrayValue: function (arr) {
      var number = window.util.getRandomInt(0, arr.length - 1);
      return arr.splice(number, 1)[0];
    },
    validElement: function (node, min, max, textInvalid) {
      var value = node.value.length;
      if (node.type.toLocaleLowerCase() === 'number') {
        if (node.value === '') {
          value = -1;
        } else {
          value = node.value;
        }
      }

      if (checkElementValue(node, value, min, max) === false) {
        node.setCustomValidity(textInvalid);
      } else {
        node.setCustomValidity('');
      }
    },
    checkElementValue: checkElementValue,
    errorHandler: createErrorHandler
  };
})();
