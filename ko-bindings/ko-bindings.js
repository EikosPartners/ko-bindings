import core from 'scalejs.core';
import ko from 'knockout';
import './slideVisible';
import './splitter';
import './clickoff';
import './showContainer';
import './profileImage';
import './hideOnResize';
import './affix';
import './numberValue';
import './floatValue';
import './renderToPoint';
import './datepicker';
import './showAllAuto';
import './hover';
import './fixedTableHeader';
import './autosize';
import './ajaxForm';
import './keepOpen';
    

    ko.bindingHandlers.comment = {
        init: function (element, valueAccessor) {
            var val = ko.unwrap(valueAccessor()),
                comment = document.createComment(val);

            ko.virtualElements.prepend(element, comment);
        }
    }

    ko.virtualElements.allowedBindings.comment = true;

    core.registerExtension({ ko: ko });



