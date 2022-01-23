const { guessType } = require('./types')
const HSV = require('./hsv')
const HSL = require('./hsl')
const OKLAB = require('./oklab')
const OKLCH = require('./oklch')

const types = [
	'rgb',
	'hsv',
	'hsl',
	'oklab',
	'oklch',
]

const primaries = {
	rgb: {
		hsv: HSV.fromRGB,
		oklab: OKLAB.fromRGB,
	},
	hsv: {
		rgb: HSV.toRGB,
		hsl: HSL.fromHSV,
	},
	hsl: {
		hsv: HSL.toHSV,
	},
	oklab: {
		rgb: OKLAB.toRGB,
		oklch: OKLCH.fromOKLAB,
	},
	oklch: {
		oklab: OKLCH.toOKLAB,
	},
}

const methods = Object.fromEntries(types.map((type) => [ type, {} ]))

{
	let missing = false
	for (const a of types) {
		for (const b of types) {
			if (a === b) { continue }
			const primary = primaries[a][b]
			if (primary) {
				methods[a][b] = primary
			} else {
				missing = true
			}
		}
	}

	while (missing) {
		missing = false
		let foundSome = false

		for (const a of types) {
			for (const b of types) {
				if (a === b) { continue }
				if (methods[a][b]) { continue }

				let found = false
				for (const c of types) {
					const method = methods[a][c]
					if (!method) { continue }
					const primary = primaries[c][b]
					if (!primary) { continue }
					methods[a][b] = (x) => primary(method(x))
					found = true
					break
				}

				if (found) {
					foundSome = true
				} else {
					missing = true
				}
			}
		}

		if (!foundSome) {
			const error = new Error("missing conversion functions")
			error.methods = methods
			throw error
		}
	}
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
	methods,
	convert,
}
