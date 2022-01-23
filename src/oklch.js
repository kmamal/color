const {
	interpolate: interpolateNumber,
} = require('@kmamal/util/number/interpolate')

// HSV COLOR
// - L
// - C
// - h
// - alpha* [0-1]

const interpolate = (a, b, ratio) => ({
	L: interpolateNumber(a.L, b.L, ratio),
	a: interpolateNumber(a.C, b.C, ratio),
	b: interpolateNumber(a.h, b.h, ratio),
	alpha: interpolateNumber(a.a ?? 1, b.a ?? 1, ratio),
})

const toOKLAB = ({ L, C, h, alpha = 1 }) => {
	const a = C * Math.cos(h)
	const b = C * Math.sin(h)
	return { L, a, b, alpha }
}

const fromOKLAB = ({ L, a, b, alpha = 1 }) => {
	const C = Math.sqrt(a * a + b * b)
	const h = Math.atan2(b, a)
	return { L, C, h, alpha }
}

module.exports = {
	interpolate,
	toOKLAB,
	fromOKLAB,
}
