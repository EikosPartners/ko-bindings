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

        if (ko.isObservable(data)) {
            //set initial values
            if (data()) {
                $(element).timepicker('setTime', moment(data(), format).toDate());
            } else {
                data(moment($(element).timepicker('getTime')).format(format));
            }

            picker.on('change', function () {
                data(moment($(element).timepicker('getTime')).format(format));
            });
            data.subscribe(function (newTime) {
                $(element).timepicker('setTime', moment(newTime, format).toDate());
            })
        } else if (data) {
            $(element).timepicker('setTime', moment(data, format).toDate());
        }
    }
};
