import core from 'scalejs.core';
import ko from 'knockout';
import Pikaday from 'pikaday-time';
import moment from 'moment';

/**
 * TODO - description
 * @module datepicker
 */

var clone = core.object.clone;

function getTimezoneOffset(date) {
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    return date;
}

function parseDateExpression(ex) {
    if (!ex) { return; }
    var date;

    if (Date.parse(ex)) {
        date = new Date(ex);
    }

    if (ex === 'currentDate') {
        date = new Date();
    }

    if (ex.indexOf('currentDate') !== -1) {
        var expression = ex.replace('currentDate', 'new Date().getDate()')
            .replace('yr', '*365'),
            date = new Date(),
            ret = eval(expression);

        date.setDate(ret);
        date;
    }
    date.setHours(0, 0, 0, 0);
    return date;
}

function convertDateFormat(d) {
    return d ? d.substring(0, 2) + '/' +
        d.substring(2, 4) + '/' +
        d.substring(4)
        : '';
}


ko.bindingHandlers.datepicker = {
    init: function (element, valueAccessor) {
        var date = clone(valueAccessor()),
            errorObservable = date.errorObservable,
            errorMessage = date.errorMessage || 'Date is disabled',
            disableInput = date.disableInput,
            yearRange, format, rawFormat, data, raw,
            maxDate = ko.unwrap(date.maxDate),
            minDate = ko.unwrap(date.minDate),
            utc = date.utc,
            picker,
            previousValue,
            disableDayFn,
            disableWeekends,
            day;

        if (!ko.isObservable(date.data)) {
            console.error('Datepicker data must be bound to an observable');
            return;
        }

        data = date.data

        if (!ko.isObservable(date.raw)) {
            raw = date.data
        } else {
            raw = date.raw
        }

        date['field'] = element;

        //defaults
        date['format'] = date['format'] || 'ddd, MMM DD YYYY';
        date['yearRange'] = date['yearRange'] || 100;
        //date['maxDate'] = date['maxDate'];
        //date['minDate'] = date['minDate'];
        rawFormat = date['rawFormat'] || undefined;
        date['disableDayFn'] = date['enabledDate'];
        date['disableWeekends'] = date['disableWeekends'];
        // because date object gets muated by pikaday we lose configurations
        // disableWeekday flag needed for manual user input
        disableWeekends = date.disableWeekends;
        //binding data to observable
        date['onSelect'] = function (d) {
            let m = this.getMoment();
            if (utc) { m = m.utc() }
            raw(m.format(rawFormat));
            errorObservable && errorObservable(null);
        };
         date['container'] = document.querySelector(date['container']);

        if (date['datepickerOptions']) {
            Object.keys(date['datepickerOptions']).forEach((opt) => {
                date[opt] = date['datepickerOptions'][opt];
            });
        }
        delete date['datepickerOptions']

        minDate = parseDateExpression(minDate);
        maxDate = parseDateExpression(maxDate);

        // remove minDate/maxDate from date picker as it wipes it out (use disableDatFn instead)
        delete date.minDate;
        delete date.maxDate;

        function dateInRange(d) {
            var valid = true;
            if (minDate) {
                valid = minDate <= d;
            }
            if (maxDate) {
                valid = valid && maxDate >= d;
            }
            return !valid;
        }

        function setDate(d) {
            var date,
                m;

            if (!d) {
                date = null;
            } else {
                m = utc ? moment.utc : moment;
                date = m(d).toDate();

                // toDate returns UTC timestamp, but we already have it accounted for, so we need to adjust
                if (utc) {
                    date = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
                }
            }
            picker.setDate(date, true);
        }

        if (date['disableDayFn']) {
            if (typeof date['disableDayFn'] !== 'function') {
                day = date['disableDayFn'];
                disableDayFn = function (d) {
                    if (d.getDate() == day) {
                        return dateInRange(d);
                    } else {
                        return true;
                    }
                }
                date['disableDayFn'] = disableDayFn;
            }
        } else {
            if (minDate || maxDate) {
                disableDayFn = dateInRange;
            }
            date['disableDayFn'] = dateInRange;
        }

        /* observable setting of min/max date disabled for now till refactor
            if (ko.isObservable(maxDate)) {
                date.maxDate = maxDate();
                maxDate.subscribe(function (mx) {
                    var newDate = parseDateExpression(mx);
                    if (picker.getDate() > newDate) {
                        picker.setDate(null);
                    }
                    picker.setMaxDate(newDate);
                });
            }
            if (ko.isObservable(minDate)) {
                date.minDate = minDate();
                minDate.subscribe(function (mn) {
                    var newDate = parseDateExpression(mn);
                    if (picker.getDate() < newDate) {
                        picker.setDate(null);
                    }
                    picker.setMinDate(newDate);
                });
            }
            */

        picker = new Pikaday(date)

        if (typeof data() === 'string') {
            // need to account for timezone offset before
            // date object returns from pikaday, else it's
            // off by one day
            setDate(data());
            // var date = new Date(data());
            //     date = getTimezoneOffset(date);
            //     picker.setDate(date, true);
        } else {
            picker.setDate(data(), true)
        }

        raw.subscribe(function (d) {
            if (typeof d === 'string') {
                //var date = new Date(d);
                //date = getTimezoneOffset(date);
                //picker.setDate(date, true);
                setDate(d);
            } else {
                picker.setDate(d, true);
            }
        });

        // this "workaround" is necessary for touch screens as pikaday has an issue with it
        // https://github.com/dbushell/Pikaday/issues/406
        if ('ontouchend' in document) {
            picker.el.addEventListener('mousedown', picker._onMouseDown, true);
        }

        if (disableInput) {
            element.onkeydown = function (event) {
                event.preventDefault();
            }
        } else {
            /* When using these options: 
                rawFormat: 'YYYY-MM-DDTHH:mm:ss[Z]',
                format: 'DD MMMM YYYY, hh:mm A [GMT]',
                utc: true
            we run into the issue where the blur handler updates the date incorrectly.
            Temporarily resolved by removing event handler for disabled inputs, since 
            we currently don't need blur in this project.
             */
            element.addEventListener('blur', function (event) {
                var dateObject;
                // prevent issues with selecting dropdown value on pikaday control
                // by returning if the user did not input a different value
                if (element.value === previousValue) { return; }
                // if the user removes the date, update the input value to blank
                if (element.value === '') {
                    data('');
                    previousValue = '';
                    errorObservable && errorObservable(null);
                    return;
                }
                dateObject = new Date(element.value);
                // if the user enters a disabled date on the datepicker, set the customError messahe
                if ((disableDayFn && disableDayFn(dateObject)) || (disableWeekends && [0, 6].indexOf(dateObject.getDay()) !== -1)) {
                    //element.value = previousValue; //uncomment if you want disable date to be removed automatically
                    errorObservable && errorObservable(errorMessage);
                    return;
                } else {
                    errorObservable && errorObservable(null);
                }
                // store previous value, fixes bug with selecting year from dropdown
                previousValue = element.value;
                // finally, the user has updated the date and needs to be set
                picker.setDate(element.value);
            });
        }
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            picker.destroy();
        });
    }
}
