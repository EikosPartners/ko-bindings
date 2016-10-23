'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('timepicker');

require('timepicker/jquery.timepicker.min.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.timepicker = {
    init: function init(element, valueAccessor) {
        var options = valueAccessor();
        var data = options.data;
        var format = options.format || '';
        var picker = (0, _jquery2.default)(element).timepicker(options);

        if (_knockout2.default.isObservable(data)) {
            //set initial values
            if (data()) {
                (0, _jquery2.default)(element).timepicker('setTime', (0, _moment2.default)(data(), format).toDate());
            } else {
                data((0, _moment2.default)((0, _jquery2.default)(element).timepicker('getTime')).format(format));
            }

            picker.on('change', function () {
                data((0, _moment2.default)((0, _jquery2.default)(element).timepicker('getTime')).format(format));
            });
            data.subscribe(function (newTime) {
                (0, _jquery2.default)(element).timepicker('setTime', (0, _moment2.default)(newTime, format).toDate());
            });
        } else if (data) {
            (0, _jquery2.default)(element).timepicker('setTime', (0, _moment2.default)(data, format).toDate());
        }
    }
};
//# sourceMappingURL=timepicker.js.map