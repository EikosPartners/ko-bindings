'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.fixedTableHeader = {
    init: function init(element, valueAccessor) {
        var $table = (0, _jquery2.default)(element),
            $bodyCells,
            colWidth,
            options = valueAccessor(),
            $scrollContainer;

        function resizeHandler() {
            $bodyCells = $table.find('tbody tr:first').children();
            colWidth = $bodyCells.map(function () {
                return window.getComputedStyle(this).width;
            });

            // Set the width of thead columns
            $table.find('thead tr').children().each(function (i, v) {
                (0, _jquery2.default)(v).css('width', colWidth[i]);
            });
        }

        (0, _jquery2.default)(window).resize(resizeHandler);
        setTimeout(function () {
            resizeHandler();
        });

        if (options.scrollListener) {
            $scrollContainer = (0, _jquery2.default)(element).scrollParent();
            $scrollContainer.bind('scroll', options.scrollListener);
        }

        _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
            (0, _jquery2.default)(window).unbind('resize', resizeHandler);
            if (options.scrollListener) {
                $scrollContainer.unbind('scroll', options.scrollListener);
            }
        });
    }
};