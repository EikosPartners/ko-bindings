import ko from 'knockout';
import $ from 'jquery';
import 'knockout-jqautocomplete/build/knockout-jqAutocomplete';

/**
 * TODO - description
 * @module showAllAuto
 */

    ko.bindingHandlers.jqAuto.options = {
        minLength: 0
    };

    ko.bindingHandlers.showAllAuto = {
        init: function (element, valueAccessor, allBindings) {
            var showAll = valueAccessor(),
                value = allBindings().jqAuto.value;
            if (showAll !== null || showAll !== 'undefined') {
                $(element).focus(function() {
                    if ($(this).attr('disabled')) { return; }
                    $(this).autocomplete('search', typeof showAll === 'string' ? showAll : $(this).val());
                });
            }

            $(element).bind('blur', function () {
                var val = $(element).val();
                if(val === '') {
                    value(val);
                }
            });
        }
    }
