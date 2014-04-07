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
				uiAs,
				imgs,
				img,
				i = 0;
			
			self.scrollArea = el.querySelector('.scroll-area');
			self.ui = el.querySelector('.ui');
			self.ul = self.scrollArea.querySelector('ul');
			self.lis = self.ul.querySelectorAll('li');
			imgs = self.ul.querySelectorAll('img');
			
			//console.log(self.imgs);
			
			for(; i < imgs.length; i++) {
				
				img = imgs[i];
				//console.log(imgs[i].complete);
				if(!img.complete) {
				
					img.onload = self.onImgLoad.bind(self);
				}
			}
			
			uiAs = self.ui.querySelectorAll('a');
			
			self.btnLeft = uiAs[0];
			self.btnRight = uiAs[1];
			
			self.btnWidth = self.btnLeft.innerWidth;
			
			self.assessWidowWidth();
			self.assessUiOn();
			
			window.onresize = self.onResize.bind(self);
			//addEventListener(_window, 'resize', self.onResize.bind(self) );
			addEventListener(self.scrollArea, 'scroll', self.onScroll.bind(self) );
			
			addEventListener(self.btnLeft, 'click', self.prev.bind(self) );
			addEventListener(self.btnRight, 'click', self.next.bind(self) );
		},/*
		
		onUiClick: function(e) {
			
			var self = this,
				target = e.target;
			
			console.log(target);
			
			if(target === self.btnRight) {
				
				console.log('next');
				self.next();
			}else {
				
				console.log('prev');
				self.prev();
			}
		},*/
		
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
		
		onImgLoad: function(e) {
			
			var self = this;
			
			self.assesLisWidth();
		},
		
		next: function() {
			
			var self = this,
				scrollLeft = self.scrollLeft,
				lisLeftOffsets = self.lisLeftOffsets,
				lisLeftOffset,
				absRight = self.absRight,
				scrollArea = self.scrollArea,
				i = 0;
			
			for(; i < lisLeftOffsets.length; i++) {
				
				lisLeftOffset = lisLeftOffsets[i];
				
				if(lisLeftOffset > scrollLeft) {
					
					if(lisLeftOffset < absRight) {
						
						scrollArea.scrollLeft = lisLeftOffset;
					}else {
						
						scrollArea.scrollLeft = absRight;
					}
					return;
				}
			}
			
			scrollArea.scrollLeft = absRight;
		},
		
		prev: function() {
			
			var self = this,
				scrollLeft = self.scrollLeft,
				lisLeftOffsets = self.lisLeftOffsets,
				lisLeftOffset,
				//absRight = self.absRight,
				scrollArea = self.scrollArea,
				i = lisLeftOffsets.length - 1;
			
			for(; i >= 0; i--) {
				
				lisLeftOffset = lisLeftOffsets[i];
				
				if(lisLeftOffset < scrollLeft) {
					
					scrollArea.scrollLeft = lisLeftOffset;
					break;
				}
			}
		},
		
		assessUiOn: function() {
			
			var self = this;
			
			self.scrollLeft = scrollLeft = self.scrollArea.scrollLeft;
			
			//console.log('scrollLeft: ' + scrollLeft +
			//		'\nabsRight: ' + self.absRight);
			
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
		
		assesLisWidth: function() {
			
			var self = this,
				lis = self.lis,
				lisWidth = 0;
				i = 0;
			
			self.lisLeftOffsets = [];
			
			for(; i < lis.length; i++) {
				
				self.lisLeftOffsets.push(lisWidth);
				//console.log('lis: ', lis[i].offsetWidth );
				lisWidth += lis[i].offsetWidth;
			}
			
			//console.log(self.lisLeftOffsets);
			
			self.absRight = lisWidth - self.ul.offsetWidth;
			
			self.assessUiOn();
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
			
			self.assesLisWidth();
			
			//console.log(windowWidth + '\n' + self.pad,
			//		'\nul width: ' + self.ul.offsetWidth);
		}
	};
	
	for(var i = 0; i < _carousels.length; i++) {
		
		new _carousel(_carousels[i] );
	}
	
}(JW, document, window) );