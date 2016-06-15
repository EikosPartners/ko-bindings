'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.keepOpen = {
    init: function init(element, valueAccessor) {
        var $button = (0, _jquery2.default)(element),
            $container = $button.closest('.row-actions-container'),
            // make configurable
        options = valueAccessor();

        function openedContainer() {
            $container.addClass('opened');
        }

        function closedContainer() {
            $container.removeClass('opened');
        }

        _knockout2.default.applyBindingsToNode(element, { click: openedContainer });
        _knockout2.default.applyBindingsToNode(element, { clickOff: closedContainer });
    }
};