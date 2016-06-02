import ko from 'knockout';
import $ from 'jquery';
import 'jquery-form';

    
    
    ko.bindingHandlers.ajaxForm = {
        init: function(
            element,
            valueAccessor
        ) {
            $(element).ajaxForm(valueAccessor());
        }
    }
