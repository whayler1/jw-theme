describe('The carousel constructor', function() {
	
	it('foo', function() {
		
		spyOn(JW.carousel.prototype, 'init');
		
		var c = new JW.carousel();
		
		expect(JW.carousel.prototype.init).toHaveBeenCalled();
	});
});