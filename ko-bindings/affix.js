import ko from 'knockout';
import $ from 'jquery';
    
    ko.bindingHandlers.affix = {
        init: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());

            function checkScroll() {
                if (window.pageYOffset >= value) {
                    $(element).addClass('affix');
                } else {
                    $(element).removeClass('affix');
                }
            }

            $(window).bind('scroll', checkScroll);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(window).unbind('scroll', checkScroll);
            });
        }
    }


