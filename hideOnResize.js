'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO - description
 * @module hideOnResize
 */

/*global define */
var initialized = false,
    resizeHandler;

_knockout2.default.bindingHandlers.hideOnResize = {
    init: function init(element, valueAccessor) {
        var actions = valueAccessor().actions,
            more = valueAccessor().more;

        if (resizeHandler) {
            (0, _jquery2.default)(window).unbind('resize', resizeHandler);
        }

        resizeHandler = checkWidth;

        (0, _jquery2.default)(window).resize(checkWidth);

        checkWidth();

        _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
            (0, _jquery2.default)(window).unbind('resize', checkWidth);
        });

        function checkWidth() {
            if ((0, _jquery2.default)(element).width() > (0, _jquery2.default)(window).width() - 80) {
                //console.log('too big');

                var children = (0, _jquery2.default)(element).children().get();
                children.reverse();
                children.reduce(function (width, element, i) {
                    var totalWidth = width + (0, _jquery2.default)(element).outerWidth();
                    //console.log('Calculating space:', totalWidth, $(window).width());
                    if (totalWidth >= (0, _jquery2.default)(window).width() - 200) {
                        var leftover = actions.splice(actions.length - i - 1, 1);
                        more((more() || []).concat(leftover));
                        return width;
                    }
                    return totalWidth;
                }, 0);
            } else {
                //console.log('good');
                if (more().length) {
                    more().reverse();
                    actions(more.splice(0, more().length).concat(actions()));
                    checkWidth();
                }
            }
        }
    }
};