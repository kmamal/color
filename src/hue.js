const {
	interpolate: interpolateNumber,
} = require('@kmamal/util/number/interpolate')

const interpolateHue = (a, b, ratio, R) => {
	const d = Math.abs(a - b)
	if (ratio === 0.5) { console.log({ a, b, R, d }) }
	if (d <= R / 2) { return interpolateNumber(a, b, ratio) }

	return a <= b
		? interpolateNumber(R + a, b, ratio) % R
		: interpolateNumber(a, R + b, ratio) % R
}

module.exports = { interpolateHue }
