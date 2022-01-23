const { guessType } = require('./type')
const HSV = require('./hsv')
const HSL = require('./hsl')

const rgb2hsv = (rgb) => HSV.fromRGB(rgb)
const hsv2rgb = (hsv) => HSV.toRGB(hsv)

const rgb2hsl = (rgb) => HSL.fromHSV(HSV.fromRGB(rgb))
const hsl2rgb = (hsl) => HSV.toRGB(HSL.toHSV(hsl))

const hsv2hsl = (hsv) => HSL.fromHSV(hsv)
const hsl2hsv = (hsl) => HSL.toHSV(hsl)


const methods = {
	rgb: {
		hsv: rgb2hsv,
		hsl: rgb2hsl,
	},
	hsv: {
		rgb: hsv2rgb,
		hsl: hsv2hsl,
	},
	hsl: {
		rgb: hsl2rgb,
		hsv: hsl2hsv,
	},
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
