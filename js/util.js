'use strict';

(function () {
  // Возвращает случайное целое число между min (включительно) и max (не включая max)
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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
    }
  };
})();