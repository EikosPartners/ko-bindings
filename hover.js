'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.hover = {
    init: function init(element, valueAccessor) {
        var hover = valueAccessor();

        if (!_knockout2.default.isObservable(hover)) {
            console.error('Hover binding expects observable');
            return;
        }

        function mouseover() {
            hover(true);
        }
        function mouseout() {
            hover(false);
        }

        element.addEventListener('mouseover', mouseover);
        element.addEventListener('mouseout', mouseout);

        _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
            element.removeEventListener('mouseover', mouseover);
            element.removeEventListener('mouseout', mouseout);
        });
    }
};