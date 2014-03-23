(function(document, window) {
	
	window.hasClass = function(el, className) {
		
		if (el.classList) {
			return el.classList.contains(className);
		}else {
			return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
		}
	};
	
	window.addClass = function(el, className) {
		
		if (el.classList) {
			el.classList.add(className);
		}else {
			el.className += ' ' + className;
		}
	};
	
	window.removeClass = function(el, className) {
		
		if (el.classList) {
			el.classList.remove(className);
		}else {
			el.className = el.className.replace(
					new RegExp('(^|\\b)' +
					className.split(' ').join('|') +
					'(\\b|$)', 'gi'), ' ');
		}
	};
}(document, window));