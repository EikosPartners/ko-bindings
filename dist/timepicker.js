'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('timepicker');

require('timepicker/jquery.timepicker.min.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.timepicker = {
    init: function init(element, valueAccessor) {
        var options = valueAccessor();
        var data = options.data;
        var picker = (0, _jquery2.default)(element).timepicker(options);

        if (_knockout2.default.isObservable(data)) {
            picker.on('change', function () {
                data((0, _jquery2.default)(element).timepicker('getTime'));
            });
            data((0, _jquery2.default)(element).timepicker('getTime'));
        }
    }
};
//# sourceMappingURL=timepicker.js.map