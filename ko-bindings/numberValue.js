import ko from 'knockout';
    
    ko.bindingHandlers.numberValue = {
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

                input().map(function (speed, index){
                    if (index < valueArray.length && parseInt(valueArray[index]) % 1 === 0){
                        speed.value(parseInt(valueArray[index], 10));
                    } else {
                        speed.value(parseInt(valueArray[valueArray.length - 1], 10));
                    }
                });

                if (valueArray.length > input().length){
                    for (var i = input().length; i < valueArray.length; i++){
                        if (parseInt(valueArray[i]) % 1 === 0) {
                            var item = {
                            value: ko.observable(parseInt(valueArray[i], 10))
                            };
                            input.push(item);
                            console.log(item.value, input());
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
        update: function(element, valueAccessor){
            var input = valueAccessor()
            var speeds = input().map(function(speed){
                return speed.value();
            });
            var speedString = speeds.join(',');

            // sets the value of the element to be the value of input
            element.value = speedString;
        }
    }
