import core from 'scalejs.core';
import ko from 'knockout';
import 'extensions/ko-bindings/slideVisible';
import 'extensions/ko-bindings/splitter';
import 'extensions/ko-bindings/clickoff';
import 'extensions/ko-bindings/showContainer';
import 'extensions/ko-bindings/profileImage';
import 'extensions/ko-bindings/hideOnResize';
import 'extensions/ko-bindings/affix';
import 'extensions/ko-bindings/numberValue';
import 'extensions/ko-bindings/floatValue';
import 'extensions/ko-bindings/renderToPoint';
import 'extensions/ko-bindings/datepicker';
import 'extensions/ko-bindings/showAllAuto';
import 'extensions/ko-bindings/hover';
import 'extensions/ko-bindings/fixedTableHeader';
import 'extensions/ko-bindings/autosize';
import 'extensions/ko-bindings/ajaxForm';
import 'extensions/ko-bindings/keepOpen';
    

    ko.bindingHandlers.comment = {
        init: function (element, valueAccessor) {
            var val = ko.unwrap(valueAccessor()),
                comment = document.createComment(val);

            ko.virtualElements.prepend(element, comment);
        }
    }

    ko.virtualElements.allowedBindings.comment = true;

    core.registerExtension({ ko: ko });



