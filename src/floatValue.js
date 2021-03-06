import ko from 'knockout';

/**
 * TODO - description
 * @module floatValue
 */

    ko.bindingHandlers.floatValue = {
        init: function (element, valueAccessor){
            var input = valueAccessor();

            // if input is not an observable, throw warning
            if(!ko.isObservable(input)) {
                console.warn('Input is not an observable');
                return;
            }

            // handles user input and updates input observable
            function onChange () {
                console.log('New value: ', element.value);
                var valueArray = element.value.split(',');

                input().map(function (zone, index){
                    if (index < valueArray.length && parseFloat(valueArray[index]) % 1 === 0){
                        zone.value(parseFloat(valueArray[index]));
                    } else {
                        zone.value(parseFloat(valueArray[index - 1]));
                    }
                });

                if (valueArray.length > input().length){
                    for (var i = input().length; i < valueArray.length; i++){
                        if (parseFloat(valueArray[i]) % 1 === 0) {
                            var item = {
                                value: ko.observable(parseFloat(valueArray[i]))
                            };
                            input.push(item);
                            console.log(item.value, ":", input());
                        }
                    }
                }
            }
            element.addEventListener('change', onChange);

            // on dom node disposal, removes the onChange listener
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                element.removeEventListener('change', onChange);
            });
        },
        update: function (element, valueAccessor){
            var input = valueAccessor()
            var zones = input().map(function(zone){
                return zone.value();
            });
            var zoneString = zones.join(',');

            // sets the value of the element to be the value of input
            element.value = zoneString;
        }
    }
