import ko from 'knockout';
import moment from 'moment';
import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.min.css';

    ko.bindingHandlers.fullCalendar = {
        init: function (element, valueAccessor) {
            var value = valueAccessor();
            $(element).fullCalendar(value);
        },
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            $(element).fullCalendar('destroy');
            $(element).fullCalendar(value);
        }
    };
