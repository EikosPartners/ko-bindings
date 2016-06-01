'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('jquery-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.ajaxForm = {
    init: function init(element, valueAccessor) {
        (0, _jquery2.default)(element).ajaxForm(valueAccessor());
    }
};