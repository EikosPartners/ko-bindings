'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO - description
 * @module clickOrEnter
 */

_knockout2.default.bindingHandlers.clickOrEnter = {
    init: function init(element, valueAccessor, allBindingsAccessor, viewModel) {
        var allBindings = allBindingsAccessor();
        function keyup(event) {
            var keyCode = event.which ? event.which : event.keyCode;
            if (keyCode === 13 || keyCode === 32) {
                allBindings.clickOrEnter.call(viewModel);
                return false;
            }
            return true;
        }
        function click() {
            allBindings.clickOrEnter.call(viewModel);
            return false;
        }

        (0, _jquery2.default)(element).keyup(keyup);
        (0, _jquery2.default)(element).click(click);

        _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
            (0, _jquery2.default)(element).unbind('keyup', keyup);
            (0, _jquery2.default)(element).unbind('click', click);
        });
    }
};
//# sourceMappingURL=clickOrEnter.js.map