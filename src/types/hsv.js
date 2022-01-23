const {
	interpolate: interpolateNumber,
} = require('@kmamal/util/number/interpolate')
const { interpolateHue } = require('../hue')

// HSV COLOR
// - h [0-3)
// - s [0-1]
// - v [0-1]
// - alpha* [0-1]

const isMember = (x) => true
	&& x.h !== undefined
	&& x.s !== undefined
	&& x.v !== undefined

const _isSingular = (a) => a.s === 0 && a.v === 0

const interpolate = (a, b, ratio) => ({
	h: a.s === 0 ? b.h : b.s === 0 ? a.h : interpolateHue(a.h, b.h, ratio, 3),
	s: _isSingular(a) ? b.s : _isSingular(b) ? a.s : interpolateNumber(a.s, b.s, ratio),
	v: interpolateNumber(a.v, b.v, ratio),
	alpha: interpolateNumber(a.alpha ?? 1, b.alpha ?? 1, ratio),
})

const toRGB = ({ h, s, v, alpha = 1 }) => {
	const high = v
	const low = high * (1 - s)

	let r
	let g
	let b

	const h2 = h * 2
	if (h2 < 1) {
		r = high
		g = interpolateNumber(low, high, h2)
		b = low
	} else if (h2 < 2) {
		g = high
		r = interpolateNumber(high, low, h2 - 1)
		b = low
	} else if (h2 < 3) {
		g = high
		b = interpolateNumber(low, high, h2 - 2)
		r = low
	} else if (h2 < 4) {
		b = high
		g = interpolateNumber(high, low, h2 - 3)
		r = low
	} else if (h2 < 5) {
		b = high
		r = interpolateNumber(low, high, h2 - 4)
		g = low
	} else {
		r = high
		b = interpolateNumber(high, low, h2 - 5)
		g = low
	}

	return { r, g, b, alpha }
}

const fromRGB = ({ r, g, b, alpha = 1 }) => {
	let high
	let mid
	let low
	let center
	let direction

	/* eslint-disable no-lonely-if */
	if (r > g) {
		if (r > b) {
			high = r
			if (g > b) {
				mid = g
				low = b
				center = 0
				direction = 0.5
			} else {
				mid = b
				low = g
				center = 3
				direction = -0.5
			}
		} else {
			high = b
			mid = r
			low = g
			center = 2
			direction = 0.5
		}
	} else {
		if (g > b) {
			high = g
			center = 1
			if (r > b) {
				mid = r
				low = b
				direction = -0.5
			} else {
				mid = b
				low = r
				direction = 0.5
			}
		} else {
			high = b
			mid = g
			low = r
			center = 2
			direction = -0.5
		}
	}
	/* eslint-enable no-lonely-if */

	if (high === low) { return { h: 0, s: 0, v: high, alpha } }

	let h = center + direction * (mid - low) / (high - low)
	const v = high
	const s = high === 0 ? 0 : 1 - (low / high)

	if (h === 3) { h = 0 }

	return { h, s, v, alpha }
}

module.exports = {
	isMember,
	interpolate,
	toRGB,
	fromRGB,
}
