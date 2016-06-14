import ko from 'knockout';
import $ from 'jquery';

/**
 * TODO - description
 * @module renderToPoint
 */

    ko.bindingHandlers.renderToPoint = {
        init: function (element, valueAccessor, allBindings, bindingContext) {
            var input = valueAccessor(),
                containerOffset = element.offsetLeft,
                box = element.parentNode;

            if (input === true){
                box.scrollLeft = containerOffset;
            }
        }
    }
