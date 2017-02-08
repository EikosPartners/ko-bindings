'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _autosize = require('autosize');

var _autosize2 = _interopRequireDefault(_autosize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO - description
 * @module autosize
 */

_knockout2.default.bindingHandlers.autosize = {
    init: function init(element, valueAccessor) {
        function applyAutosize() {
            (0, _autosize2.default)(element);
        }

        function destroyAutosize() {
            _autosize2.default.destroy(element);
        }

        element.addEventListener('focus', applyAutosize);
        element.addEventListener('focusout', destroyAutosize);

        _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
            element.removeEventListener('focus', applyAutosize);
            element.removeEventListener('focusout', destroyAutosize);
        });
    }
};
//# sourceMappingURL=autosize.js.map