import { globalMetadata } from 'scalejs.metadataFactory';
import ko from 'knockout';

ko.bindingHandlers.fontIcon = {
    init: function (element, valueAccessor) {
        let prefix = globalMetadata()['font-prefix'] || 'fa';

        if (prefix && !element.classList.contains(prefix)) {
            element.classList.add(prefix);
        }
    },
    update: function (element, valueAccessor) {
        let prefix = globalMetadata()['font-prefix'] || 'fa';
        let iconClass = valueAccessor();
        let classes = element.classList;
        let previousClass;

        if (typeof iconClass === 'string') {
            iconClass = prefix + '-' + iconClass;
            previousClass = ko.utils.domData.get(element, 'previousClass');
            
            //check to see if a previous class was applied, has changed, and is still on element, then remove
            if (previousClass && previousClass !== iconClass && classes.contains(previousClass)) {
                classes.remove(previousClass);
            }

            if (!classes.contains(iconClass)) {
                classes.add(iconClass)
            }

            ko.utils.domData.set(element, 'previousClass', iconClass); 
        }

        if (typeof iconClass === 'object') {
            Object.keys(iconClass).forEach(function(key) {
                iconClass[prefix + '-' + key] = iconClass[key];
                delete iconClass[key];
            });
            

            Object.keys(iconClass).forEach(function(key){
                if (classes.contains(key) && !ko.unwrap(iconClasses[key])) {
                    classes.remove(key);
                 } else if (!classes.contains(key) && ko.unwrap(iconClasses[key])) {
                     classes.add(key);
                 }
            });
        }
    }
}
