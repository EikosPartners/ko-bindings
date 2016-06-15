'use strict';

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var has = _scalejs2.default.object.has;

_knockout2.default.bindingHandlers.clickOff = function () {

    var checkAIsntParentOrB = function checkAIsntParentOrB(a, b) {
        var cls, index, value;

        while (has(b) && has(cls = (b.className || '').split(' '))) {

            if (a === b) {
                return false;
            }

            // for all includes, each --revisit use of for loop
            for (index in this.includes) {
                if (this.includes.hasOwnProperty(index)) {
                    value = this.includes[index];
                    if ( // is a string and in class name, or, is an element and is the target
                    'string' === typeof value && cls.indexOf(value) > -1 || value instanceof Element && value.isEqualNode(b)) {
                        return true;
                    }
                }
            }

            // for all exculdes, each --revisit use of for loop
            for (index in this.excludes) {
                if (this.excludes.hasOwnProperty(index)) {
                    value = this.excludes[index];

                    if ( // is a string and in class name, or, is an element and is the target
                    'string' === typeof value && cls.indexOf(value) > -1 || value instanceof Element && value.isEqualNode(b)) {
                        return false;
                    }
                }
            }

            // move up in the dom
            b = b.parentNode;
        }
        return true;
    };

    return {
        init: function init(element, valueAccessor, allBindings, viewModel) {
            var va = valueAccessor(),
                wasRemoved = false,
                eventListener;

            if (!has(va)) {
                return;
            }

            // Normalize value accessor

            if (va instanceof Function) {
                // convert function to expected object
                va = {
                    handler: va,
                    includes: va.includes,
                    excludes: va.excludes
                };
            }

            // enforce handler function
            if (!(va.handler instanceof Function)) {
                throw new TypeError('clickoff: handler function required');
            }

            va.handler = va.handler.bind(viewModel);

            // provide defaults for includes and excludes
            va.includes || (va.includes = ['clickoff']);
            va.excludes || (va.excludes = ['no-clickoff']);

            eventListener = function eventListener(event) {
                if (wasRemoved) {
                    return;
                }
                if (checkAIsntParentOrB.call(va, element, event.target)) {
                    va.handler.apply(this, [arguments, [element]]);
                }
            };

            // add handler to body and create dom removal callback for cleanup
            document.body.addEventListener('click', eventListener);
            _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
                wasRemoved = true;
                document.body.removeEventListener('click', eventListener);
            });
        }
    };
}();