import { globalMetadata } from 'scalejs.metadataFactory';
import { unwrap } from 'knockout';

ko.bindingHandlers.fontIcon = {
    init: function (element, valueAccessor) {
        let prefix = globalMetadata()['font-prefix'];

        if (prefix && !element.classList.contains(prefix)) {
            element.classList.add(prefix);
        }
    },
    update: function (element, valueAccessor) {
        let prefix = globalMetadata()['font-prefix'];
        let iconClass = valueAccessor();
        let classes = element.classList;

        if (typeof iconClass === 'string') {
            iconclass = prefix ? prefix + '-' + iconClass : iconClass;
            
            if (prefix && !classes.contains(prefix + '-' + iconClass)) {
                classes.add(iconClass)
            } 
        }

        if (typeof iconClass === 'object') {
            if (prefix) {
                Object.keys(iconClass).forEach(function(key) {
                    iconClass[prefix + '-' + key] = iconClass[key];
                    delete iconClass[key];
                });
            }

            Object.keys(iconClass).forEach(function(key){
                if (classes.contains(key) && !unwrap(iconClasses[key])) {
                    classes.remove(key);
                 } else if (!classes.contains(key) && unwrap(iconClasses[key])) {
                     classes.add(key);
                 }
            });
        }
    }
}
