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
        var m = _moment2.default,
            time = void 0;

        if (options.utc) {
            m = m.utc;
        }

        if (_knockout2.default.isObservable(data)) {
            //set initial values
            if (data()) {
                (0, _jquery2.default)(element).timepicker('setTime', m(data(), format).toDate());
            } else {
                time = (0, _jquery2.default)(element).timepicker('getTime'); // Does this ever return a value?
                if (time) {
                    data(m(time).format(format));
                }
            }

            picker.on('change', function () {
                var newValue = m((0, _jquery2.default)(element).timepicker('getTime'));

                if (newValue.isValid()) {
                    data(newValue.format(format));
                } else {
                    data('');
                }
            });
            data.subscribe(function (newTime) {
                (0, _jquery2.default)(element).timepicker('setTime', m(newTime, format).toDate());
            });
        } else if (data) {
            (0, _jquery2.default)(element).timepicker('setTime', m(data, format).toDate());
        }

        picker.on('showTimepicker', function () {
            (0, _jquery2.default)('.ui-timepicker-wrapper').outerWidth((0, _jquery2.default)(element).outerWidth());
        });
    }
};
//# sourceMappingURL=timepicker.js.map