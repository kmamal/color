const { guessType } = require('./guess-type')
const { convert } = require('./convert')
const { methods } = require('./interpolate')
const { binarySearch } = require('@kmamal/util/array/searching/binary')

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

const makeWeightedScale = (_colors, _type) => {
	const type = _type ?? guessType(_colors[0][1])
	const num = _colors.length
	const positions = new Array(num)
	const colors = new Array(num)
	for (let i = 0; i < num; i++) {
		const [ position, color ] = _colors[i]
		positions[i] = position
		colors[i] = convert(color, type)
	}
	const method = methods[type]

	return (x) => {
		const bi = binarySearch(positions, x) || 1
		const bw = positions[bi]
		const b = colors[bi]
		if (x === bw) { return b }
		const ai = bi - 1
		const aw = positions[ai]
		const a = colors[ai]
		if (x === aw) { return a }
		const ratio = (x - aw) / (bw - aw)
		return method(a, b, ratio)
	}
}

module.exports = {
	makeScale,
	makeWeightedScale,
}
