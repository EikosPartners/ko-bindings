import { merge } from 'scalejs';
import $ from 'jquery';
import ko from 'knockout';
import _ from 'lodash';
import 'jquery-tokeninput';
import 'jquery-tokeninput/styles/token-input.css';

    ko.bindingHandlers.tokeninputSource = {
        init: function(
            element,
            valueAccessor,
            allBindings
        ) {
            var params = valueAccessor(),
                bindings = allBindings(),
                $selectedElement = $(element),
                value = bindings.tokeninputValue || ko.observable(),
                tokeninputUpdating = false,
                reinit = false;
            
            function getOptions() {
                return merge({ 
                    theme: 'pjson', 
                    onResult: onResult,
                    onAdd: onAdd,
                    onDelete: onDelete,
                    preventDuplicates: true,
                    minChars: 0,
                    caching: false,
                    searchDelay: 0,
                    animateDropdown: false,
                    allowTabOut: true,
                    noResultsText: null,
                    searchingText: null,
                    disabled: ko.unwrap(bindings.tokeninputDisable),
                    prePopulate: params.filter(function (result) {
                        return (value() || []).includes(result.id);
                    }),
                }, bindings.tokenInputOptions)
            }
            
            function onResult(results) {
                //console.log('Results -->', results);
                return results.filter(function (result) {
                    return !value().includes(result.id);
                });
            }

            function onAdd(added) {
                //console.log('Add -->', added);
                tokeninputUpdating = true;
                value.push(added.id);
                tokeninputUpdating = false;
            }

            function onDelete(deleted) {
                //console.log('Delete -->', deleted);
                if (reinit) {
                    return;
                }
                tokeninputUpdating = true;
                value.remove(deleted.id);
                tokeninputUpdating = false;
            }

            function init() {
                $selectedElement.tokenInput(params, getOptions());
            }

            init();

            value.subscribe(function() {
                if(!tokeninputUpdating) {
                    reinit = true;
                    $selectedElement.tokenInput('destroy');
                    init();
                    reinit = false;
                }
            })
            
            // if (options.placeholder) {
            //     $selectedElement.parent().find('input').attr('placeholder', options.placeholder);
            // }
        },
        update: function(
            element,
            valueAccessor,
            allBindings
        ) {
            var params = valueAccessor();
            //console.log('new params-->', params);
            $(element).data('settings').local_data = params;
        }
    }
    
    ko.bindingHandlers.tokeninputDisable = {
        update: function (
            element,
            valueAccessor
        ) {
            let isDisabled = valueAccessor();

            $(element).tokenInput('toggleDisabled', ko.unwrap(isDisabled));
        }
    };

    ko.bindingHandlers.tokeninputOptions = {};

    ko.bindingHandlers.tokeninputValue = {};