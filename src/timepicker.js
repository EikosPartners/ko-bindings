import ko from 'knockout';
import $ from 'jquery';
import moment from 'moment';
import 'timepicker';
import 'timepicker/jquery.timepicker.min.css';

ko.bindingHandlers.timepicker = {
    init: function (element, valueAccessor) {
        var options = valueAccessor();
        var data = options.data;
        var format = options.format || '';
        var picker = $(element).timepicker(options);
        var time;

        if (ko.isObservable(data)) {
            //set initial values
            if (data()) {
                $(element).timepicker('setTime', moment(data(), format).toDate());
            } else {
                time = $(element).timepicker('getTime'); // Does this ever return a value?
                if (time) {
                    data(moment(time).format(format));
                }
            }

            picker.on('change', function () {
                let newValue = moment($(element).timepicker('getTime'));
                if(newValue.isValid()) {
                    data(newValue.format(format));
                } else {
                    data('');
                }
            });
            data.subscribe(function (newTime) {
                $(element).timepicker('setTime', moment(newTime, format).toDate());
            });
        } else if (data) {
            $(element).timepicker('setTime', moment(data, format).toDate());
        }

        picker.on('showTimepicker', function() {
            $('.ui-timepicker-wrapper').outerWidth($(element).outerWidth());
        })

    }
};
