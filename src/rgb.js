const {
	interpolate: interpolateNumber,
} = require('@kmamal/util/number/interpolate')

// RGB COLOR
// - r [0-1]
// - g [0-1]
// - b [0-1]
// - alpha* [0-1]

const interpolate = (a, b, ratio) => ({
	r: interpolateNumber(a.r, b.r, ratio),
	g: interpolateNumber(a.g, b.g, ratio),
	b: interpolateNumber(a.b, b.b, ratio),
	alpha: interpolateNumber(a.alpha ?? 1, b.alpha ?? 1, ratio),
})

module.exports = {
	interpolate,
}
