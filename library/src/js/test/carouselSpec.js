describe('The carousel constructor', function() {
	
	it('has called init', function() {
		
		spyOn(JW.carousel.prototype, 'init');
		
		var c = new JW.carousel();
		
		expect(JW.carousel.prototype.init).toHaveBeenCalled();
	});
	
	it('has called assessWidowWidth', function() {
		
		spyOn(JW.carousel.prototype, 'assessWidowWidth');
		
		var c = new JW.carousel();
		
		expect(JW.carousel.prototype.assessWidowWidth).toHaveBeenCalled();
	});
});