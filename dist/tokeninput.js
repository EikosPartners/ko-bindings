'use strict';

var _scalejs = require('scalejs');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('ep-jquery-tokeninput');

require('ep-jquery-tokeninput/styles/token-input.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.tokeninputSource = {
    init: function init(element, valueAccessor, allBindings) {
        var params = valueAccessor(),
            bindings = allBindings(),
            $selectedElement = (0, _jquery2.default)(element),
            value = bindings.tokeninputValue || _knockout2.default.observable(),
            toggleSelection = bindings.tokeninputToggleSelection;
        var tokeninputOptions = bindings.tokeninputOptions || {},
            tokeninputUpdating = false,
            //prevent update on programatic update
        tokeninputDestroying = false,
            //prevent update on re-init or destroy
        reinit = false,
            // prevent update on re-init
        sub = null;

        function getOptions() {
            return (0, _scalejs.merge)({
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
                disabled: _knockout2.default.unwrap(bindings.tokeninputDisable),
                prePopulate: valueAccessor().filter(function (result) {
                    return (value() || []).includes(result.id);
                })
            }, tokeninputOptions);
        }

        if (bindings.tokenInputOptions) {
            console.error('tokenInputOptions is depricated, please use tokeninputOptions');
            tokeninputOptions = bindings.tokenInputOptions;
        }

        function onResult(results) {
            // console.log('Results -->', results);
            return results.filter(function (result) {
                return !value().includes(result.id);
            });
        }

        function onAdd(added) {
            // console.log('Add -->', added);
            tokeninputUpdating = true;
            if (added.id === toggleSelection) {
                value.removeAll();
                $selectedElement.tokenInput("clear");
            } else if (value().includes(toggleSelection)) {
                value.removeAll([toggleSelection]);
                $selectedElement.tokenInput("remove", { id: toggleSelection });
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

        sub = value.subscribe(function () {
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

        _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
            tokeninputDestroying = true;
            $selectedElement.tokenInput('destroy');
            tokeninputDestroying = false;
            sub.dispose();
        });
    },
    update: function update(element, valueAccessor, allBindings) {
        var params = valueAccessor(),
            value = allBindings().tokeninputValue;
        // console.log('new params-->', params);
        (0, _jquery2.default)(element).data('settings').local_data = params;

        if (_knockout2.default.isObservable(value) && value().length > 0) {
            value.valueHasMutated();
            // redudancy because local_data is set after initialization
            // but if there was some initial values, we want to redo prepoulate logic
            // so we need to reset local_data as again after initialization we want to make sure it is set
            (0, _jquery2.default)(element).data('settings').local_data = params;
        }
    }
};

_knockout2.default.bindingHandlers.tokeninputDisable = {
    update: function update(element, valueAccessor) {
        var isDisabled = valueAccessor();

        (0, _jquery2.default)(element).tokenInput('toggleDisabled', _knockout2.default.unwrap(isDisabled));
    }
};

_knockout2.default.bindingHandlers.tokeninputTokens = {
    init: function init(element, valueAccessor) {
        var tokens = valueAccessor();
        var lastTokens = tokens().slice(),
            sub = null;

        sub = tokens.subscribe(function (newTokens) {
            _knockout2.default.utils.compareArrays(lastTokens, newTokens).forEach(function (difference) {
                if (difference.status === 'added') {
                    (0, _jquery2.default)(element).tokenInput('add', difference.value);
                }
                if (difference.status === 'deleted') {
                    (0, _jquery2.default)(element).tokenInput('remove', difference.value);
                }
            });
            lastTokens = newTokens.slice();
        });

        _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
            sub.dispose();
        });
    }
};

_knockout2.default.bindingHandlers.tokeninputOptions = {};

_knockout2.default.bindingHandlers.tokeninputValue = {};
//# sourceMappingURL=tokeninput.js.map