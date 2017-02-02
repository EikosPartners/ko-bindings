'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO - description
 * @module renderToPoint
 */

_knockout2.default.bindingHandlers.renderToPoint = {
    init: function init(element, valueAccessor, allBindings, bindingContext) {
        var input = valueAccessor(),
            containerOffset = element.offsetLeft,
            box = element.parentNode;

        if (input === true) {
            box.scrollLeft = containerOffset;
        }
    }
};
//# sourceMappingURL=renderToPoint.js.map