const { guessType } = require('./type')
const { _convert } = require('./convert')
const RGB = require('./rgb')
const HSV = require('./hsv')
const HSL = require('./hsl')

const methods = {
	rgb: RGB.interpolate,
	hsv: HSV.interpolate,
	hsl: HSL.interpolate,
}

const _interpolate = (_a, aType, _b, bType, cType) => {
	const a = aType === cType ? _a : _convert(_a, aType, cType)
	const b = bType === cType ? _b : _convert(_b, bType, cType)
	return methods[cType](a, b)
}
const interpolate = (a, b, type) => {
	const aType = guessType(a)
	const bType = guessType(b)
	return _interpolate(a, aType, b, bType, type)
}

module.exports = {
	methods,
	_interpolate,
	interpolate,
}
