'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('knockout-jqAutocomplete');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.jqAuto.options = {
    minLength: 0
};

_knockout2.default.bindingHandlers.showAllAuto = {
    init: function init(element, valueAccessor, allBindings) {
        var showAll = valueAccessor(),
            value = allBindings().jqAuto.value;
        if (showAll !== null || showAll !== 'undefined') {
            (0, _jquery2.default)(element).focus(function () {
                if ((0, _jquery2.default)(this).attr('disabled')) {
                    return;
                }
                (0, _jquery2.default)(this).autocomplete('search', typeof showAll === 'string' ? showAll : (0, _jquery2.default)(this).val());
            });
        }

        (0, _jquery2.default)(element).bind('blur', function () {
            var val = (0, _jquery2.default)(element).val();
            if (val === '') {
                value(val);
            }
        });
    }
};