
(function(JW) {
	
	var JW.Dom = JW.Dom || {};
	
	JW.Dom.addEventListener = function(el, eventName, handler) {
		
		if (el.addEventListener) {
		
			el.addEventListener(eventName, handler);
		
		} else {
		
			el.attachEvent('on' + eventName, function(){
		
				handler.call(el);
			});
		}
	}
	
	JW.Dom.removeEventListener = function(el, eventName, handler) {
		if (el.removeEventListener)
			el.removeEventListener(eventName, handler);
		else
			el.detachEvent('on' + eventName, handler);
	}
}(JW));
