import ko from 'knockout';
import $ from 'jquery';
      
    
    ko.bindingHandlers.keepOpen = {
        init: function (element, valueAccessor) {
        	var $button = $(element),
        		$container = $button.closest('.row-actions-container'), // make configurable 
        		options = valueAccessor();
        
        	function openedContainer (){
        		$container.addClass('opened');
        	}

	        function closedContainer (){
	        	$container.removeClass('opened');
	        }

	        ko.applyBindingsToNode(element, { click: openedContainer });
	        ko.applyBindingsToNode(element, { clickOff: closedContainer });
        }
    };
  