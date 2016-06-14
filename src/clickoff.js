import core from 'scalejs.core';
import ko from 'knockout';
import _ from 'lodash';



/**
 * A knockout binding that is used to allow detection of clicking on another element i.e. "clicking off"
 * @example
 * return {
 *   clickOff: function() {
 *     alert('it works!');
 *   }
 * };
 * @param {function} handler - the function that is called when click off
 * @param {string[]|HTMLElement[]} includes - an array of class names or html dom elements that when clicked on will invoke the handler
 * @param {string[]|HTMLElement[]} excludes - an array of class names or html dom elements that when clicked on will *not* invoke the handler
 * @example
 * clickOff: {
 *    handler: function ( ) {
 *        alert('it works!');
 *    },
 *    includes: ['clickOn', 'mainContent'],
 *    excludes: ['clickOff', 'titleBar']
 * }
 * @module clickOff
 */


    let has = core.object.has;

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
        let cls, index, value;

        //loop from click target to root parent of click target
        while (has(clickTarget)) {

            if (element === clickTarget) {
                return false;
            }

            //clickTarget.className.baseVal is the way to get classNames for SVG elements (path, etc)
            if(has(clickTarget.className, 'baseVal')) {
                cls = clickTarget.className.baseVal.split(' ');
            } else {
                cls = (clickTarget.className || '').split(' ');
            }


            let filterFunc = (value) => {
                return (typeof value === 'string' && cls.indexOf(value) > -1)
                    || (value instanceof Element && value.isEqualNode(clickTarget));
            }


            if(_.some(this.includes, filterFunc)) {
                return true;
            }


            if(_.some(this.excludes, filterFunc)) {
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
    function init( element, valueAccessor, allBindings, viewModel ) {
        let va = valueAccessor(),
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
        if (! (va.handler instanceof Function)) {
            throw new TypeError('clickoff: handler function required');
        }

        va.handler = va.handler.bind(viewModel);

        // provide defaults for includes and excludes
        if(!has(va.includes)) {
            va.includes = ['clickoff'];
        }
        if(!has(va.excludes)) {
            va.excludes = ['no-clickoff'];
        }

        eventListener = function ( event ) {
            if (wasRemoved) { return; }
            if (canClickOff.call(va, element, event.target)) {
                va.handler.apply(this, [arguments,[element]]);
            }
        };

        // add handler to body and create dom removal callback for cleanup
        document.body.addEventListener('click', eventListener);
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            wasRemoved = true;
            document.body.removeEventListener('click', eventListener);
        });
    }

    ko.bindingHandlers.clickOff = {
        init: init
    };
