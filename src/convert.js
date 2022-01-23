const HSV = require('./hsv')

const rgb2hsv = (rgb) => HSV.fromRGB(rgb)
const hsv2rgb = (hsv) => HSV.toRGB(hsv)

const methods = {
	rgb: {
		hsv: rgb2hsv,
	},
	hsv: {
		rgb: hsv2rgb,
	},
}

const guessType = (x) => {
	if (x.r && x.g && x.b) { return 'rgb' }
	if (x.h && x.s && x.v) { return 'hsv' }
	return null
}

const _convert = (a, aType, bType) => {
	if (aType === bType) { return a }

	const method = methods[aType][bType]
	if (!method) {
		const error = new Error("no conversion method")
		error.color = a
		error.from = aType
		error.to = bType
		throw error
	}

	return method(a)
}

const convert = (a, type) => {
	const aType = guessType(a)
	if (!aType) {
		const error = new Error("can't guess type")
		error.color = a
		throw error
	}

	return _convert(a, aType, type)
}

module.exports = {
	rgb2hsv,
	hsv2rgb,
	convert,
}
