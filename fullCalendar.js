'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('fullcalendar');

require('fullcalendar/dist/fullcalendar.min.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.fullCalendar = {
    init: function init(element, valueAccessor) {
        var value = valueAccessor();
        (0, _jquery2.default)(element).fullCalendar(value);
    },
    update: function update(element, valueAccessor) {
        var value = valueAccessor();
        (0, _jquery2.default)(element).fullCalendar('destroy');
        (0, _jquery2.default)(element).fullCalendar(value);
    }
};
//# sourceMappingURL=fullCalendar.js.map