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
            toggleSelection = bindings.tokeninputToggleSelection;
        let tokeninputOptions = bindings.tokeninputOptions || {},
            tokeninputUpdating = false, //prevent update on programatic update
            tokeninputDestroying = false, //prevent update on re-init or destroy
            reinit = false, // prevent update on re-init
            sub = null;

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
                prePopulate: valueAccessor().filter(result => (value() || []).includes(result.id))
            }, tokeninputOptions);
        }

        if (bindings.tokenInputOptions) {
            console.error('tokenInputOptions is depricated, please use tokeninputOptions');
            tokeninputOptions = bindings.tokenInputOptions;
        }

        function onResult(results) {
            // console.log('Results -->', results);
            return results.filter(result => !value().includes(result.id));
        }

        function onAdd(added) {
            // console.log('Add -->', added);
            tokeninputUpdating = true;
            if (added.id === toggleSelection) {
                value.removeAll();
                $selectedElement.tokenInput("clear");
            } else if (value().includes(toggleSelection)) {
                value.removeAll([toggleSelection]);
                $selectedElement.tokenInput("remove", {id: toggleSelection});
            }
            value.push(added.id);
            tokeninputUpdating = false;
        }

        function onDelete(deleted) {
            // console.log('Delete -->', deleted);
            if (reinit || tokeninputDestroying) {
                return;
            }
            tokeninputUpdating = true;
            value.remove(deleted.id);
            tokeninputUpdating = false;
            if (tokeninputOptions.onTokenDelete) {
                tokeninputOptions.onTokenDelete.apply(this, arguments);
            }
        }

        function init() {
            $selectedElement.tokenInput(params, getOptions());
        }

        init();

        sub = value.subscribe(() => {
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
            sub.dispose();
        });
    },
    update: function (
        element,
        valueAccessor,
        allBindings
    ) {
        const params = valueAccessor(),
            value = allBindings().tokeninputValue;
        // console.log('new params-->', params);
        $(element).data('settings').local_data = params;

        if (ko.isObservable(value) && value().length > 0) {
            value.valueHasMutated();
            // redudancy because local_data is set after initialization
            // but if there was some initial values, we want to redo prepoulate logic
            // so we need to reset local_data as again after initialization we want to make sure it is set
            $(element).data('settings').local_data = params;
        }
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
        let lastTokens = tokens().slice(),
            sub = null;

        sub = tokens.subscribe((newTokens) => {
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

        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            sub.dispose();
        });
    }
};

ko.bindingHandlers.tokeninputOptions = {};

ko.bindingHandlers.tokeninputValue = {};