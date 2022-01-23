
const guessType = (x) => {
	if (x.r !== undefined && x.g !== undefined && x.b !== undefined) { return 'rgb' }
	if (x.h !== undefined && x.s !== undefined && x.v !== undefined) { return 'hsv' }
	if (x.h !== undefined && x.s !== undefined && x.l !== undefined) { return 'hsl' }
	if (x.L !== undefined && x.a !== undefined && x.b !== undefined) { return 'oklab' }
	return null
}

module.exports = { guessType }
