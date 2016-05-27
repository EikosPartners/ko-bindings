import ko from 'knockout';
import autosize from 'autosize';
    
    ko.bindingHandlers.autosize = {
        init: function (element, valueAccessor) {
            function applyAutosize() {
                autosize(element);
            }

            function destroyAutosize () {
                autosize.destroy(element);
            }
            
            element.addEventListener('focus', applyAutosize);
            element.addEventListener('focusout', destroyAutosize);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                element.removeEventListener('focus', applyAutosize);
                element.removeEventListener('focusout', destroyAutosize);
            });
        }
    }


