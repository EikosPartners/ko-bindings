'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _scalejs = require('scalejs.metadataFactory');

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.fontIcon = {
    init: function init(element, valueAccessor) {
        var prefix = (0, _scalejs.globalMetadata)()['font-prefix'] || 'fa';

        if (prefix && !element.classList.contains(prefix)) {
            element.classList.add(prefix);
        }
    },
    update: function update(element, valueAccessor) {
        var prefix = (0, _scalejs.globalMetadata)()['font-prefix'] || 'fa';
        var iconClass = valueAccessor();
        var classes = element.classList;
        var previousClass = void 0;

        if (typeof iconClass === 'string') {
            iconClass = prefix + '-' + iconClass;
            previousClass = _knockout2.default.utils.domData.get(element, 'previousClass');

            //check to see if a previous class was applied, has changed, and is still on element, then remove
            if (previousClass && previousClass !== iconClass && classes.contains(previousClass)) {
                classes.remove(previousClass);
            }

            if (!classes.contains(iconClass)) {
                classes.add(iconClass);
            }

            _knockout2.default.utils.domData.set(element, 'previousClass', iconClass);
        }

        if ((typeof iconClass === 'undefined' ? 'undefined' : _typeof(iconClass)) === 'object') {
            Object.keys(iconClass).forEach(function (key) {
                iconClass[prefix + '-' + key] = iconClass[key];
                delete iconClass[key];
            });

            Object.keys(iconClass).forEach(function (key) {
                if (classes.contains(key) && !_knockout2.default.unwrap(iconClass[key])) {
                    classes.remove(key);
                } else if (!classes.contains(key) && _knockout2.default.unwrap(iconClass[key])) {
                    classes.add(key);
                }
            });
        }
    }
};
//# sourceMappingURL=fontIcon.js.map