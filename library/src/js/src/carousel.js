(function(JW, document, window) {
	
	var _consts = JW.consts,
		
		_carousels = document.querySelectorAll(_consts.QUERY_CAROUSEL),
		
		_NUM_PADMOBILE = _consts.NUM_PADMOBILE,
		_NUM_PADDESKTOP = _consts.NUM_PADDESKTOP,
		_NUM_BREAKPOINT = _consts.NUM_BREAKPOINT,
		
		_STR_DESKTOP = _consts.STR_DESKTOP,
		_STR_MOBILE = _consts.STR_MOBILE,
		
		_CLASS_ON = _consts.CLASS_ON,
		
		//_window = window,
		
		_carousel = function(el) {
			
			var self = this;
			self.el = el;
			self.init();
		};
	
	_carousel.prototype = {
		
		init: function() {
			
			var self = this,
				el = self.el,
				uiAs;
			
			self.scrollArea = el.querySelector('.scroll-area');
			self.ui = el.querySelector('.ui');
			self.ul = self.scrollArea.querySelector('ul');
			console.log('ul: ' + self.ul);
			
			uiAs = self.ui.querySelectorAll('a');
			
			self.btnLeft = uiAs[0];
			self.btnRight = uiAs[1];
			
			self.btnWidth = self.btnLeft.innerWidth;
			
			console.log('here', self.btnLeft, self.btnLeft.innerWidth);
			
			self.assessWidowWidth();
			self.assessUiOn();
			
			window.onresize = self.onResize.bind(self);
			//addEventListener(_window, 'resize', self.onResize.bind(self) );
			addEventListener(self.scrollArea, 'scroll', self.onScroll.bind(self) );
		},
		
		onResize: function(e) {
			
			var self = this;
			
			//console.log('resize', window.innerWidth);
			self.assessWidowWidth();
		},
		
		onScroll: function(e) {
			
			var self = this;
			
			//console.log('scrollll', self.el);
			
			self.assessUiOn();
		},
		
		assessUiOn: function() {
			
			var self = this,
				scrollLeft = self.scrollArea.scrollLeft;
			
			console.log('scrollLeft: ' + scrollLeft +
					'\nabsRight: ' + self.absRight);
			
			if(scrollLeft > 0) {
				
				addClass(self.btnLeft, _CLASS_ON);
			}else {
				
				removeClass(self.btnLeft, _CLASS_ON);
			}
			
			if(scrollLeft < self.absRight) {
				
				addClass(self.btnRight, _CLASS_ON);
			}else {
				
				removeClass(self.btnRight, _CLASS_ON);
			}
		},
		
		assessWidowWidth: function() {
			
			var self = this,
				windowWidth,
				lis = self.ul.querySelectorAll('li'),
				lisWidth = 0;
				i = 0;
			
			self.windowWidth = windowWidth = window.innerWidth;
			
			if(windowWidth < _NUM_BREAKPOINT) {
				self.pad = _NUM_PADMOBILE;
			}else {
				self.pad = _NUM_PADDESKTOP;
			}
			
			for(; i < lis.length; i++) {
				
				//console.log('lis: ', lis[i].offsetWidth );
				lisWidth += lis[i].offsetWidth;
			}
			
			self.absRight = lisWidth - self.ul.offsetWidth;
			
			//console.log(windowWidth + '\n' + self.pad,
			//		'\nul width: ' + self.ul.offsetWidth);
		}
	};
	
	for(var i = 0; i < _carousels.length; i++) {
		
		new _carousel(_carousels[i] );
	}
	
}(JW, document, window) );