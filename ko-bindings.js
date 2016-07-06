'use strict';

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

require('./slideVisible');

require('./splitter');

require('./clickoff');

require('./showContainer');

require('./profileImage');

require('./hideOnResize');

require('./affix');

require('./numberValue');

require('./floatValue');

require('./renderToPoint');

require('./datepicker');

require('./showAllAuto');

require('./hover');

require('./fixedTableHeader');

require('./autosize');

require('./ajaxForm');

require('./keepOpen');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO - description
 * @module comment
 */
_knockout2.default.bindingHandlers.comment = {
    init: function init(element, valueAccessor) {
        var val = _knockout2.default.unwrap(valueAccessor()),
            comment = document.createComment(val);

        _knockout2.default.virtualElements.prepend(element, comment);
    }
};

_knockout2.default.virtualElements.allowedBindings.comment = true;

_scalejs2.default.registerExtension({ ko: _knockout2.default });