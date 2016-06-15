'use strict';

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A knockout binding that is used to allow detection of clicking on another element i.e. "clicking off"
 * @param {function} clickOff - the function that is called when click off
 * @param {object} clickOff - a configuration object with additional parameters to modify the behaviour of click off
 * @param {function} clickOff.handler -  the function that is called when click off
 * @param {string[]|HTMLElement[]} [clickOff.includes] - an array of class names or html dom elements that when clicked on will invoke the handler
 * @param {string[]|HTMLElement[]} [clickOff.excludes] - an array of class names or html dom elements that when clicked on will <strong>not</strong> invoke the handler
 * 
 * @example <caption>Passing a function to value accessor</caption>
 * clickOff: function() {
 *   alert('it works!');
 * }
 * @example <caption>Passing an object with includes and excludes</caption>
 * clickOff: {
 *    handler: function ( ) {
 *        alert('it works!');
 *    },
 *    includes: ['clickOn', 'mainContent'],
 *    excludes: ['clickOff', 'titleBar']
 * }
 * @module clickOff
 */

var has = _scalejs2.default.object.has;

/**
 *
 * 1. click off should be invoked if the click target is not the element
 *    or a child of the element bound to click-off
 * 2. click off should also be invoked if the target or one of the parents
 *    of the target include a class name that matches this.includes
 * 3. the opposite applies for this.excludes
 * @private
 * @param  {HTMLElement} element        the element that has click-off bound to it
 * @param  {HTMLElement} clickTarget    the target of the click
 * @return {boolean}
 */

function canClickOff(element, clickTarget) {
    var cls = void 0,
        index = void 0,
        value = void 0;

    //loop from click target to root parent of click target
    while (has(clickTarget)) {

        if (element === clickTarget) {
            return false;
        }

        //clickTarget.className.baseVal is the way to get classNames for SVG elements (path, etc)
        if (has(clickTarget.className, 'baseVal')) {
            cls = clickTarget.className.baseVal.split(' ');
        } else {
            cls = (clickTarget.className || '').split(' ');
        }

        var filterFunc = function filterFunc(value) {
            return typeof value === 'string' && cls.indexOf(value) > -1 || value instanceof Element && value.isEqualNode(clickTarget);
        };

        if (_lodash2.default.some(this.includes, filterFunc)) {
            return true;
        }

        if (_lodash2.default.some(this.excludes, filterFunc)) {
            return false;
        }

        // move up in the dom
        clickTarget = clickTarget.parentNode;
    }
    return true;
}

/**
 * clickOff binding - A binding that invokes a handler when the user clicks somewhere else
 * @private
 * @param  {HTMLElement} element        the dom element clickOff is bound to
 * @param  {Function} valueAccessor     the options passed to the clickOff binding
 * @param  {type} allBindings           description
 * @param  {type} viewModel             description
 */
function init(element, valueAccessor, allBindings, viewModel) {
    var va = valueAccessor(),
        wasRemoved = false,
        eventListener = void 0;

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
    if (!has(va.includes)) {
        va.includes = ['clickoff'];
    }
    if (!has(va.excludes)) {
        va.excludes = ['no-clickoff'];
    }

    eventListener = function eventListener(event) {
        if (wasRemoved) {
            return;
        }
        if (canClickOff.call(va, element, event.target)) {
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

_knockout2.default.bindingHandlers.clickOff = {
    init: init
};