const { guessType } = require('./type')
const { convert } = require('./convert')
const { methods } = require('./interpolate')
const { binarySearch } = require('@kmamal/util/array/search/binary')

const makeScale = (_colors, _type) => {
	const type = _type ?? guessType(_colors[0])
	const num = _colors.length
	const colors = _colors.map((color) => convert(color, type))
	const method = methods[type]
	const scaling = num - 1

	return (x) => {
		const scaled = x * scaling
		const ai = Math.floor(scaled)
		const a = colors[ai]
		if (ai === scaled) { return a }
		const bi = ai + 1
		const b = colors[bi]
		const ratio = scaled - ai
		return method(a, b, ratio)
	}
}

const makeWeightedSacle = (_colors, _type) => {
	const type = _type ?? guessType(_colors[0][1])
	const num = _colors.length
	const weights = new Array(num)
	const colors = new Array(num)
	let total = 0
	for (let i = 0; i < num; i++) {
		const [ weight, color ] = _colors[i]
		total += weight
		weights[i] = total
		colors[i] = convert(color, type)
	}
	const method = methods[type]

	return (x) => {
		const ai = binarySearch(weights, x)
		const aw = weights[ai]
		const a = colors[ai]
		if (x === aw) { return a }
		const bi = ai + 1
		const bw = weights[bi]
		const b = colors[bi]
		const ratio = (x - aw) / (bw - aw)
		return method(a, b, ratio)
	}
}

module.exports = {
	makeScale,
	makeWeightedSacle,
}
