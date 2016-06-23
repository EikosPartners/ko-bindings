'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO - description
 * @module showContainer
 */

/*
 * valueAccessor
 * outer - element on which to bind click handler outside of element
 * inner - element on which to bind click handler inside of element
 * container - element to show or hidw
 */
/*global define */
_knockout2.default.bindingHandlers.showContainer = {
    init: function init(element, valueAccessor) {
        var options = valueAccessor(),
            input = options.outer ? (0, _jquery2.default)(element).closest(options.outer).get(0) : (0, _jquery2.default)(element).find(options.inner).get(0),
            $container = (0, _jquery2.default)(element).find(options.container),
            container = $container.get(0);

        function showContainer() {
            setTimeout(function () {
                $container.fadeIn();
                document.activeElement.blur();
            });
        }

        function hideContainer() {
            $container.fadeOut();
        }

        //$container.on('mouseleave', hideContainer);

        _knockout2.default.applyBindingsToNode(input, { click: showContainer });
        //$(element).click(showContainer);
        _knockout2.default.applyBindingsToNode(element, { clickOff: hideContainer });

        //return { controlsDescendantBindings: true };
    }
};