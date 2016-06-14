import ko from 'knockout';
import $ from 'jquery';

/**
 * TODO - description
 * @module hover
 */

    ko.bindingHandlers.hover = {
        init: function (element, valueAccessor) {
            var hover = valueAccessor();

            if(!ko.isObservable(hover)) {
                console.error('Hover binding expects observable');
                return;
            }

            function mouseover() {
                hover(true);
            }
            function mouseout() {
                hover(false);
            }

            element.addEventListener('mouseover', mouseover);
            element.addEventListener('mouseout', mouseout);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                element.removeEventListener('mouseover', mouseover);
                element.removeEventListener('mouseout', mouseout);
            });
        }
    }
