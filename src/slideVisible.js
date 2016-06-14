import ko from 'knockout';
import $ from 'jquery';

/**
 * TODO - description
 * @module slideVisible
 */

    ko.bindingHandlers.slideVisible = {
        init: function (element, valueAccessor) {
            var isVisible = ko.unwrap(valueAccessor());

            if (isVisible) {
                $(element).show();
            } else {
                $(element).hide();
            }
        },
        update: function (element, valueAccessor) {
            var isVisible = ko.unwrap(valueAccessor());

            if (isVisible) {
                $(element).slideDown('fast');
            } else {
                $(element).slideUp('fast');
            }
        }
    }
