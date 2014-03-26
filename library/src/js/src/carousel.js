(function(JW, document, window) {
	
	var _consts = JW.consts,
		
		_carousels = document.querySelectorAll('.carousel'),
		
		_NUM_PADMOBILE = 20,
		_NUM_PADDESKTOP = 50,
		_NUM_BREAKPOINT = 768,
		
		_STR_DESKTOP = 'desktop',
		_STR_MOBILE = 'mobile',
		
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
			
			var self = this;
			
			console.log(self.scrollArea.scrollLeft);
		},
		
		assessWidowWidth: function() {
			
			var self = this,
				windowWidth;
			
			self.windowWidth = windowWidth = window.innerWidth;
			
			if(windowWidth < _NUM_BREAKPOINT) {
				self.pad = _NUM_PADMOBILE;
			}else {
				self.pad = _NUM_PADDESKTOP;
			}
			
			console.log(windowWidth + '\n' + self.pad);
		}
	};
	
	for(var i = 0; i < _carousels.length; i++) {
		
		new _carousel(_carousels[i] );
	}
	
}(JW, document, window) );