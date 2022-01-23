const {
	interpolate: interpolateNumber,
} = require('@kmamal/util/number/interpolate')

// RGB COLOR
// - r [0-1]
// - g [0-1]
// - b [0-1]
// - a* [0-1]

const fromName = (name) => {
	switch (name) {
		case 'black': return { r: 0, g: 0, b: 0 }
		case 'white': return { r: 1, g: 1, b: 1 }
		case 'gray': return { r: 0.5, g: 0.5, b: 0.5 }
		case 'red': return { r: 1, g: 0, b: 0 }
		case 'green': return { r: 0, g: 1, b: 0 }
		case 'blue': return { r: 0, g: 0, b: 1 }
		case 'yellow': return { r: 1, g: 1, b: 0 }
		case 'cyan': return { r: 0, g: 1, b: 1 }
		case 'magenta': return { r: 1, g: 0, b: 1 }
		default: return null
	}
}

const interpolate = (a, b, ratio) => ({
	r: interpolateNumber(a.r, b.r, ratio),
	g: interpolateNumber(a.g, b.g, ratio),
	b: interpolateNumber(a.b, b.b, ratio),
	a: interpolateNumber(a.a ?? 1, b.a ?? 1, ratio),
})

module.exports = {
	fromName,
	interpolate,
}
