(function(JW, document, window) {
	
	var _consts = JW.consts,
		
		_QUERY_DROPOWN = _consts.QUERY_DROPOWN,
		
		_CLASS_EXPAND = _consts.CLASS_EXPAND,
		
		_dropDown = function(el) {
			
			var self = this;
			
			self.el = el;
			self.init();
		},
		
		_init = function() {
			
			var dropdowns = document.querySelectorAll(_QUERY_DROPOWN),
				i = 0;
			
			//console.log(dropdowns);
			
			for( ; i < dropdowns.length; i++) {
				
				//addEventListener(dropdowns[i], 'click', _onClick);
				
				new _dropDown(dropdowns[i] );
			}
		};
	
	_dropDown.prototype = {
		
		init: function() {
			
			var self = this;
			
			self.anchor = self.el.querySelector('a');
			//console.log('init');
			
			addEventListener(self.anchor, 'click', self.onClick.bind(self) );
		},
		
		onClick: function(e) {
			
			var self = this,
				el = self.el;
			
			if(!hasClass(el, _CLASS_EXPAND) ) {
				
				//console.log('has');
				addClass(el, _CLASS_EXPAND);
			}else {
				
				//console.log('has not');
				removeClass(el, _CLASS_EXPAND);
			}
		}
	};
		/*
		_onClick = function(e) {
			
			var target = e.target;
			
			if(!hasClass(target, _CLASS_EXPAND) ) {
				
				//console.log('has');
				addClass(target, _CLASS_EXPAND);
			}else {
				
				//console.log('has not');
				removeClass(target, _CLASS_EXPAND);
			}
		},
		
		_init = function() {
			
			var dropdowns = document.querySelectorAll(_QUERY_DROPOWN),
				i = 0;
			
			console.log(dropdowns);
			
			for( ; i < dropdowns.length; i++) {
				
				addEventListener(dropdowns[i], 'click', _onClick);
			}
		};
	*/
	
	_init();
	
}(JW, document, window));