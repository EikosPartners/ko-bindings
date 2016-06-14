import ko from 'knockout';
import $ from 'jquery';
import 'jquery-form';

/**
 * TODO - description
 * @module ajaxForm
 */

    ko.bindingHandlers.ajaxForm = {
        init: function(
            element,
            valueAccessor
        ) {
            $(element).ajaxForm(valueAccessor());
        }
    }
