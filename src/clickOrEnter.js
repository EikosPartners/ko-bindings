import ko from 'knockout';
import $ from 'jquery';

/**
 * TODO - description
 * @module clickOrEnter
 */

ko.bindingHandlers.clickOrEnter = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var allBindings = allBindingsAccessor();
            function keyup(event) {
                var keyCode = (event.which ? event.which : event.keyCode);
                if (keyCode === 13 || keyCode === 32) {
                    allBindings.clickOrEnter.call(viewModel);
                    return false;
                }
                return true;             
            }
            function click() {
                allBindings.clickOrEnter.call(viewModel);
                return false;
            }
            
            $(element).keyup(keyup);
            $(element).click(click);
            
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
               $(element).unbind('keyup', keyup);
               $(element).unbind('click', click)
            });
       }
    };
