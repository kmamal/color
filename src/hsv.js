const {
	interpolate: interpolateNumber,
} = require('@kmamal/util/number/interpolate')

// HSV COLOR
// - h [0-3)
// - s [0-1]
// - v [0-1]
// - a* [0-1]

const fromName = (name) => {
	switch (name) {
		case 'black': return { h: 0, s: 0, v: 0 }
		case 'white': return { h: 0, s: 0, v: 1 }
		case 'gray': return { h: 0, s: 0, v: 0.5 }
		case 'red': return { h: 0, s: 1, v: 1 }
		case 'green': return { h: 1, s: 1, v: 1 }
		case 'blue': return { h: 2, s: 1, v: 1 }
		case 'yellow': return { h: 0.5, s: 1, v: 1 }
		case 'cyan': return { h: 1.5, s: 1, v: 1 }
		case 'magenta': return { h: 2.5, s: 1, v: 1 }
		default: return null
	}
}

const _interpolateHue = (a, b, ratio) => {
	const ah = a.h
	const bh = b.h

	if (a.s === 0) { return bh }
	if (b.s === 0) { return ah }

	const d = Math.abs(ah - bh)
	if (d <= 1.5) { return interpolateNumber(ah, bh, ratio) }

	return ah <= bh
		? interpolateNumber(3 + ah, bh, ratio) % 3
		: interpolateNumber(ah, 3 + bh, ratio) % 3
}

const _isSingular = (a) => a.s === 0 && a.v === 0

const interpolate = (a, b, ratio) => ({
	h: _interpolateHue(a, b, ratio),
	s: _isSingular(a) ? b.s : _isSingular(b) ? a.s : interpolateNumber(a.s, b.s, ratio),
	v: interpolateNumber(a.v, b.v, ratio),
	a: interpolateNumber(a.a ?? 1, b.a ?? 1, ratio),
})

const toRGB = ({ h, s, v, a = 1 }) => {
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

	return { r, g, b, a }
}

const fromRGB = ({ r, g, b, a = 1 }) => {
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

	if (high === low) { return { h: 0, s: 0, v: high, a } }

	let h = center + direction * (mid - low) / (high - low)
	const v = high
	const s = high === 0 ? 0 : 1 - (low / high)

	if (h === 3) { h = 0 }

	return { h, s, v, a }
}

module.exports = {
	fromName,
	_interpolateHue,
	interpolate,
	toRGB,
	fromRGB,
}
