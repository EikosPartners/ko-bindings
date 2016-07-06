'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO - description
 * @module slideVisible
 */

_knockout2.default.bindingHandlers.slideVisible = {
    init: function init(element, valueAccessor) {
        var isVisible = _knockout2.default.unwrap(valueAccessor());

        if (isVisible) {
            (0, _jquery2.default)(element).show();
        } else {
            (0, _jquery2.default)(element).hide();
        }
    },
    update: function update(element, valueAccessor) {
        var isVisible = _knockout2.default.unwrap(valueAccessor());

        if (isVisible) {
            (0, _jquery2.default)(element).slideDown('fast');
        } else {
            (0, _jquery2.default)(element).slideUp('fast');
        }
    }
};