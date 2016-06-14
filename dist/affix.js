'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO - description
 * @module affix
 */

_knockout2.default.bindingHandlers.affix = {
    init: function init(element, valueAccessor) {
        var value = _knockout2.default.unwrap(valueAccessor());

        function checkScroll() {
            if (window.pageYOffset >= value) {
                (0, _jquery2.default)(element).addClass('affix');
            } else {
                (0, _jquery2.default)(element).removeClass('affix');
            }
        }

        (0, _jquery2.default)(window).bind('scroll', checkScroll);

        _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
            (0, _jquery2.default)(window).unbind('scroll', checkScroll);
        });
    }
};