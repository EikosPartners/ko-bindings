/*global define */
import core from 'scalejs.core';
import ko from 'knockout';
import $ from 'jquery';
     

    var token,
        defaultUrl = '/gmep/images/default-profile-photo.png',
        get = core.object.get;

    function getToken(callback) {
        $.ajax({
           type: 'GET',
           url:'/rest/api/resourceIndex',
           success: function(data, textStatus, request){
             token = request.getResponseHeader('X-Oracle-RF-Token');
             callback();
           },
           error: function (request, textStatus, errorThrown) {    
            console.error('Error to get Token: '+errorThrown);    
            callback();
           }
        });
    }

    ko.bindingHandlers.profileImage = {
        init: function (
            element,
            valueAccessor,
            allBindingsAccessor
        ) {
            var userId = valueAccessor(),
                imageSrc = ko.observable({}),
                size = allBindingsAccessor().size || 'small',
                nameOnRight = allBindingsAccessor().nameOnRight || false;
                
            function setProfileImage() {
               // at this point, if there is no user id or no token
               // then we should just show a default image.
               if(!userId || !token) {
                   imageSrc({
                    imageUrl: defaultUrl,
                    size: size
                   });
                   return;
               }
               
                $.ajax({
                   url: '/rest/api/gmep/share/profile/' + userId + '?utoken=' + token,
                   success: function (data) {
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
                   error: function () {
                       imageSrc({
                        imageUrl: defaultUrl,
                        size: size
                       });
                   }
                });                 
            }

            ko.applyBindingsToNode(element, { template: { name: 'profile_picture_template', data: imageSrc } });

            // if the token already exists, can just get images
            if(token) {
                setProfileImage();
            } else {
            // otherwise, first get the token then set the profile iamge.
                getToken(setProfileImage);
            }
            
            return { controlsDescendantBindings: true };
        }
    };
    
    //No pesky logs!
    ko.bindingHandlers.size = ko.bindingHandlers.size || {};
    ko.bindingHandlers.nameOnRight = ko.bindingHandlers.nameOnRight || {};  

    function xmlToJson(xml) {        
      // Create the return object
      var obj = {};

      if (xml.nodeType == 1) { // element
          // do attributes
          if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
              for (var j = 0; j < xml.attributes.length; j++) {
                  var attribute = xml.attributes.item(j);
                  obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
              }
          }
      } else if (xml.nodeType == 3) { // text
          obj = xml.nodeValue;
      }

      // do children
      if (xml.hasChildNodes()) {
          for(var i = 0; i < xml.childNodes.length; i++) {
              var item = xml.childNodes.item(i);
              var nodeName = item.nodeName;
              if (typeof(obj[nodeName]) == "undefined") {
                  obj[nodeName] = xmlToJson(item);
              } else {
                  if (typeof(obj[nodeName].push) == "undefined") {
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
