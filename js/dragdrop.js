'use strict';

(function () {
  window.dragdrop = {
    create: function (element, mainWindow) {
      element.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();
          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };
          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          var x = (mainWindow.offsetLeft - shift.x) < 0 ? 0 : mainWindow.offsetLeft - shift.x;
          console.log(x);
          mainWindow.style.top = x + 'px';
          mainWindow.style.left = (mainWindow.offsetLeft - shift.x) + 'px';
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }
  };
})();
