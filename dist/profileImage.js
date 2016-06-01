'use strict';

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token,
    defaultUrl = '/gmep/images/default-profile-photo.png',
    get = _scalejs2.default.object.get; /*global define */


function getToken(callback) {
    _jquery2.default.ajax({
        type: 'GET',
        url: '/rest/api/resourceIndex',
        success: function success(data, textStatus, request) {
            token = request.getResponseHeader('X-Oracle-RF-Token');
            callback();
        },
        error: function error(request, textStatus, errorThrown) {
            console.error('Error to get Token: ' + errorThrown);
            callback();
        }
    });
}

_knockout2.default.bindingHandlers.profileImage = {
    init: function init(element, valueAccessor, allBindingsAccessor) {
        var userId = valueAccessor(),
            imageSrc = _knockout2.default.observable({}),
            size = allBindingsAccessor().size || 'small',
            nameOnRight = allBindingsAccessor().nameOnRight || false;

        function setProfileImage() {
            // at this point, if there is no user id or no token
            // then we should just show a default image.
            if (!userId || !token) {
                imageSrc({
                    imageUrl: defaultUrl,
                    size: size
                });
                return;
            }

            _jquery2.default.ajax({
                url: '/rest/api/gmep/share/profile/' + userId + '?utoken=' + token,
                success: function success(data) {
                    var json = xmlToJson(data),
                        imageUrl = get(json, 'profileResponse.imageURL.#text'),
                        initialName = get(json, 'profileResponse.initialName.#text'),
                        displayName = get(json, 'profileResponse.displayName.#text');

                    if (imageUrl) {
                        imageUrl = '/webcenter' + imageUrl;
                    } else if (!initialName) {
                        imageUrl = defaultUrl;
                    }

                    imageSrc({
                        initialName: initialName,
                        imageUrl: imageUrl,
                        displayName: displayName,
                        size: size,
                        nameOnRight: nameOnRight
                    });
                },
                error: function error() {
                    imageSrc({
                        imageUrl: defaultUrl,
                        size: size
                    });
                }
            });
        }

        _knockout2.default.applyBindingsToNode(element, { template: { name: 'profile_picture_template', data: imageSrc } });

        // if the token already exists, can just get images
        if (token) {
            setProfileImage();
        } else {
            // otherwise, first get the token then set the profile iamge.
            getToken(setProfileImage);
        }

        return { controlsDescendantBindings: true };
    }
};

//No pesky logs!
_knockout2.default.bindingHandlers.size = _knockout2.default.bindingHandlers.size || {};
_knockout2.default.bindingHandlers.nameOnRight = _knockout2.default.bindingHandlers.nameOnRight || {};

function xmlToJson(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) {
        // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) {
        // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof obj[nodeName].push == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}