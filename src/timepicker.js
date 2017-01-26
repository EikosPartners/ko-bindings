import ko from 'knockout';
import $ from 'jquery';
import moment from 'moment';
import 'timepicker';
import 'timepicker/jquery.timepicker.min.css';

ko.bindingHandlers.timepicker = {
    init: function (element, valueAccessor) {
        const options = valueAccessor();
        const data = options.data;
        const format = options.format || '';
        const picker = $(element).timepicker(options);
        let m = moment,
            time;


        if (options.utc) {
            m = m.utc;
        }

        if (ko.isObservable(data)) {
            //set initial values
            if (data()) {
                $(element).timepicker('setTime', m(data(), format).toDate());
            } else {
                time = $(element).timepicker('getTime'); // Does this ever return a value?
                if (time) {
                    data(m(time).format(format));
                }
            }

            picker.on('change', function () {
                let newValue = m($(element).timepicker('getTime'));
            
                if(newValue.isValid()) {
                    data(newValue.format(format));
                } else {
                    data('');
                }
            });
            data.subscribe(function (newTime) {
                $(element).timepicker('setTime', m(newTime, format).toDate());
            });
        } else if (data) {
            $(element).timepicker('setTime', m(data, format).toDate());
        }

        picker.on('showTimepicker', function() {
            $('.ui-timepicker-wrapper').outerWidth($(element).outerWidth());
        })

    }
};
