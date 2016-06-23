/*global define */
import ko from 'knockout';
import $ from 'jquery';


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
    ko.bindingHandlers.showContainer = {
        init: function (
            element,
            valueAccessor
        ) {
            var options = valueAccessor(),
                input = options.outer ?
                    $(element).closest(options.outer).get(0)
                    : $(element).find(options.inner).get(0),
                $container = $(element).find(options.container),
                container = $container.get(0);

            function showContainer() {
                setTimeout(function() {
                    $container.fadeIn();
                    document.activeElement.blur();
                })
            }

            function hideContainer() {
                $container.fadeOut();
            }

            //$container.on('mouseleave', hideContainer);

            ko.applyBindingsToNode(input, { click: showContainer });
            //$(element).click(showContainer);
            ko.applyBindingsToNode(element, { clickOff: hideContainer });

            //return { controlsDescendantBindings: true };
        }
    };
