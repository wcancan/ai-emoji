'use strict';

(function (win, doc) {
    function change() {
        var clientWidth = doc.documentElement.clientWidth;
        var clientHeight = doc.documentElement.clientHeight;
        if (clientWidth > clientHeight) {
            clientWidth = clientHeight;
        } else if (clientWidth > 750) {
            clientWidth = 750;
        }
        doc.documentElement.style.fontSize = clientWidth / 375 * 100 + 'px';
    }
    change();
    win.addEventListener('resize', change, false);
})(window, document);