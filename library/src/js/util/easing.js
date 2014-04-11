/**
 * Easing equations. Taken from http://www.gizma.com/easing/
 *
 * @param {Number} t Current time.
 * @param {Number} b Start value.
 * @param {Number} c Change in value.
 * @param {Number} d Duration.
 */

var JW = JW || {};

JW.Ease = JW.Ease || {};

JW.Ease.easeOutQuad = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
};