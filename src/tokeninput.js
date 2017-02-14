import { merge } from 'scalejs';
import $ from 'jquery';
import ko from 'knockout';
import _ from 'lodash';
import 'ep-jquery-tokeninput';
import 'ep-jquery-tokeninput/styles/token-input.css';

ko.bindingHandlers.tokeninputSource = {
    init: function (
        element,
        valueAccessor,
        allBindings
    ) {
        const params = valueAccessor(),
            bindings = allBindings(),
            $selectedElement = $(element),
            value = bindings.tokeninputValue || ko.observable(),
            tokeninputOptions = bindings.tokeninputOptions || {};
        let tokeninputUpdating = false, //prevent update on programatic update
            tokeninputDestroying = false, //prevent update on re-init or destroy
            reinit = false; // prevent update on re-init

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
                prePopulate: params.filter(result => (value() || []).includes(result.id))
            }, tokeninputOptions);
        }

        if (bindings.tokeninputOptions) {
            console.error('tokenInputOptions is depricated, please use tokeninputOptions');
            tokeninputOptions = tokenInputOptions;
        }

        function onResult(results) {
            // console.log('Results -->', results);
            return results.filter(result => !value().includes(result.id));
        }

        function onAdd(added) {
            // console.log('Add -->', added);
            tokeninputUpdating = true;
            value.push(added.id);
            tokeninputUpdating = false;
        }

        function onDelete(deleted) {
            // console.log('Delete -->', deleted);
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

        value.subscribe(() => {
            if (!tokeninputUpdating) {
                reinit = true;
                $selectedElement.tokenInput('destroy');
                init();
                reinit = false;
            } else if (!tokeninputDestroying) {
                if (tokeninputOptions.onChange) {
                    tokeninputOptions.onChange();
                }
            }
        });

        // if (options.placeholder) {
        //     $selectedElement.parent().find('input').attr('placeholder', options.placeholder);
        // }

        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            tokeninputDestroying = true;
            $selectedElement.tokenInput('destroy');
            tokeninputDestroying = false;
        });
    },
    update: function (
        element,
        valueAccessor
    ) {
        const params = valueAccessor();
        // console.log('new params-->', params);
        $(element).data('settings').local_data = params;
    }
};

ko.bindingHandlers.tokeninputDisable = {
    update: function (
        element,
        valueAccessor
    ) {
        const isDisabled = valueAccessor();

        $(element).tokenInput('toggleDisabled', ko.unwrap(isDisabled));
    }
};

ko.bindingHandlers.tokeninputTokens = {
    init: function (
        element,
        valueAccessor
    ) {
        const tokens = valueAccessor();
        let lastTokens = tokens().slice();

        tokens.subscribe((newTokens) => {
            ko.utils.compareArrays(lastTokens, newTokens)
                .forEach((difference) => {
                    if (difference.status === 'added') {
                        $(element).tokenInput('add', difference.value);
                    }
                    if (difference.status === 'deleted') {
                        $(element).tokenInput('remove', difference.value);
                    }
                });
            lastTokens = newTokens.slice();
        });
    }
};

ko.bindingHandlers.tokeninputOptions = {};

ko.bindingHandlers.tokeninputValue = {};