const {
	interpolate: interpolateNumber,
} = require('@kmamal/util/number/interpolate')
const { _interpolateHue } = require('./hsv')

// HSV COLOR
// - h [0-3)
// - s [0-1]
// - v [0-1]
// - a* [0-1]

const fromName = (name) => {
	switch (name) {
		case 'black': return { h: 0, s: 0, l: 0 }
		case 'white': return { h: 0, s: 0, l: 1 }
		case 'gray': return { h: 0, s: 0, l: 0.5 }
		case 'red': return { h: 0, s: 1, l: 0.5 }
		case 'green': return { h: 1, s: 1, l: 0.5 }
		case 'blue': return { h: 2, s: 1, l: 0.5 }
		case 'yellow': return { h: 0.5, s: 1, l: 0.5 }
		case 'cyan': return { h: 1.5, s: 1, l: 0.5 }
		case 'magenta': return { h: 2.5, s: 1, l: 0.5 }
		default: return null
	}
}

const _isSingular = (a) => a.l === 0 || a.l === 1

const interpolate = (a, b, ratio) => ({
	h: _interpolateHue(a, b, ratio),
	s: _isSingular(a) ? b.s : _isSingular(b) ? a.s : interpolateNumber(a.s, b.s, ratio),
	l: interpolateNumber(a.l, b.l, ratio),
	a: interpolateNumber(a.a ?? 1, b.a ?? 1, ratio),
})

const toHSV = ({ h, s: sl, l, a = 1 }) => {
	const v = l + sl * Math.min(l, 1 - l)
	const s = v === 0 ? 0 : 2 * (1 - l / v)
	return { h, s, v, a }
}

const fromHSV = ({ h, s: sv, v, a = 1 }) => {
	const l = v * (1 - sv / 2)
	const s = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l)
	return { h, s, l, a }
}

module.exports = {
	fromName,
	interpolate,
	toHSV,
	fromHSV,
}
