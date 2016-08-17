'use strict';

var _scalejs = require('scalejs');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('jquery-tokeninput');

require('jquery-tokeninput/styles/token-input.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.tokeninputSource = {
    init: function init(element, valueAccessor, allBindings) {
        var params = valueAccessor(),
            bindings = allBindings(),
            $selectedElement = (0, _jquery2.default)(element),
            value = bindings.tokeninputValue || _knockout2.default.observable(),
            tokeninputUpdating = false,
            reinit = false;

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
                prePopulate: params.filter(function (result) {
                    return (value() || []).includes(result.id);
                })
            }, bindings.tokenInputOptions);
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

        value.subscribe(function () {
            if (!tokeninputUpdating) {
                reinit = true;
                $selectedElement.tokenInput('destroy');
                init();
                reinit = false;
            }
        });

        // if (options.placeholder) {
        //     $selectedElement.parent().find('input').attr('placeholder', options.placeholder);
        // }
    },
    update: function update(element, valueAccessor, allBindings) {
        var params = valueAccessor();
        //console.log('new params-->', params);
        (0, _jquery2.default)(element).data('settings').local_data = params;
    }
};

_knockout2.default.bindingHandlers.tokeninputDisable = {
    update: function update(element, valueAccessor) {
        var isDisabled = valueAccessor();

        (0, _jquery2.default)(element).tokenInput('toggleDisabled', _knockout2.default.unwrap(isDisabled));
    }
};

_knockout2.default.bindingHandlers.tokeninputOptions = {};
//# sourceMappingURL=tokeninput.js.map