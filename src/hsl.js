const {
	interpolate: interpolateNumber,
} = require('@kmamal/util/number/interpolate')
const { _interpolateHue } = require('./hsv')

// HSV COLOR
// - h [0-3)
// - s [0-1]
// - v [0-1]
// - a* [0-1]

const _isSingular = (a) => a.l === 0 || a.l === 1

const interpolate = (a, b, ratio) => ({
	h: _interpolateHue(a, b, ratio),
	s: _isSingular(a) ? b.s : _isSingular(b) ? a.s : interpolateNumber(a.s, b.s, ratio),
	l: interpolateNumber(a.l, b.l, ratio),
	alpha: interpolateNumber(a.alpha ?? 1, b.alpha ?? 1, ratio),
})

const toHSV = ({ h, s: sl, l, alpha = 1 }) => {
	const v = l + sl * Math.min(l, 1 - l)
	const s = v === 0 ? 0 : 2 * (1 - l / v)
	return { h, s, v, alpha }
}

const fromHSV = ({ h, s: sv, v, alpha = 1 }) => {
	const l = v * (1 - sv / 2)
	const s = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l)
	return { h, s, l, alpha }
}

module.exports = {
	interpolate,
	toHSV,
	fromHSV,
}
