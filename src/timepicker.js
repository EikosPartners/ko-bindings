import ko from 'knockout';
import $ from 'jquery';
import 'timepicker';
import 'timepicker/jquery.timepicker.min.css';

    ko.bindingHandlers.timepicker = {
        init: function (element, valueAccessor) {
            var options = valueAccessor();
            var data = options.data;
            var picker = $(element).timepicker(options);

            if(ko.isObservable(data)) {
              picker.on('change', function() {
                data($(element).timepicker('getTime'));
              });
              data($(element).timepicker('getTime'));
              data.subscribe(function (newTime) {
                  $element.timepicker('setTime', newTime);
              })
            }
        }
    };
