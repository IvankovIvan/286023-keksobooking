'use strict';

(function () {
  window.dragdrop = {
    create: function (element, mainWindow, input) {
      element.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var writeInput = function (coordX, coordY) {
          var SHIFT_Y = 50;
          input.value = 'x: ' + coordX + '; y: ' + (coordY + SHIFT_Y);
        };

        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var map = mainWindow.getBoundingClientRect();
        var width = map.right - map.left;
        var height = map.bottom - map.top;

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();


          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          var x = 0;

          if (element.offsetLeft < 0) {
            x = 0;
          } else if ((element.offsetLeft - shift.x) > width) {
            x = element.offsetLeft;

          } else {
            x = element.offsetLeft - shift.x;
          }

          var y = 0;

          if (element.offsetTop < 0) {
            y = 0;
          } else if (element.offsetTop - shift.y >= height) {
            y = element.offsetTop;
          } else {
            y = (element.offsetTop - shift.y);
          }

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          element.style.top = y + 'px';
          element.style.left = x + 'px';
          writeInput(x, y);
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
          writeInput(parseInt(element.style.left, 10), parseInt(element.style.top, 10));
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }
  };
})();
