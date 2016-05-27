/*global define */
import ko from 'knockout';
import $ from 'jquery';
   
    
    var initialized = false,
        resizeHandler;
    
    ko.bindingHandlers.hideOnResize = {
        init: function (element, valueAccessor) {
            var actions = valueAccessor().actions,
                more = valueAccessor().more;
                
            if (resizeHandler) {
                $(window).unbind('resize',resizeHandler);
            }
            
            resizeHandler = checkWidth;
            
            $(window).resize(checkWidth)            
            
            checkWidth();
            
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(window).unbind('resize', checkWidth);
            });
            
            function checkWidth() {
                if($(element).width() > ($(window).width()- 80)) {
                    //console.log('too big');
                                        
                    var children = $(element).children().get();
                    children.reverse()
                    children.reduce(function (width, element, i) { 
                        var totalWidth = width + $(element).outerWidth();
                        //console.log('Calculating space:', totalWidth, $(window).width());
                        if(totalWidth >= $(window).width() - 200) {
                            var leftover = actions.splice(actions.length - i - 1, 1);
                            more((more() || []).concat(leftover));
                            return width;
                        }
                        return totalWidth;
                    }, 0)

                } else {
                    //console.log('good');
                    if (more().length) {
                        more().reverse();
                        actions((more.splice(0, more().length).concat(actions())));
                        checkWidth();   
                    }
                }            
            }
            
        }
    };

