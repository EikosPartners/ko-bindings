import ko from 'knockout';
import $ from 'jquery';
    
         
    ko.bindingHandlers.fixedTableHeader = {
        init: function (element, valueAccessor) {
            var $table = $(element),
                $bodyCells,
                colWidth,
                options = valueAccessor(),
                $scrollContainer;           
            
            function resizeHandler() {
                $bodyCells = $table.find('tbody tr:first').children();
                colWidth = $bodyCells.map(function() {
                    return window.getComputedStyle(this).width;
                });
                
                // Set the width of thead columns
                $table.find('thead tr').children().each(function(i, v) {
                    $(v).css('width', colWidth[i]);
                });                  
            }
            
            $(window).resize(resizeHandler);
            setTimeout(function () {
                resizeHandler();
            });
            
            if(options.scrollListener) {
                $scrollContainer = $(element).scrollParent();           
                $scrollContainer.bind('scroll', options.scrollListener);
            }

            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(window).unbind('resize', resizeHandler);
                if(options.scrollListener) {
                    $scrollContainer.unbind('scroll', options.scrollListener);                    
                }
            });
        }
    }
