const Types = require('./types')
const { guessType } = require('./guess-type')

const typeNames = Object.keys(Types)
const methods = Object.fromEntries(typeNames.map((type) => [ type, {} ]))

{
	const primaries = Object.fromEntries(typeNames.map((type) => [ type, {} ]))
	const pattern = /^(?<direction>from|to)(?<_b>[A-Z]+)$/u

	let count = 0
	for (const [ a, obj ] of Object.entries(Types)) {
		for (const [ name, method ] of Object.entries(obj)) {
			const match = name.match(pattern)
			if (!match) { continue }
			const { groups: { direction, _b } } = match
			const b = _b.toLowerCase()
			if (direction === 'to') {
				primaries[a][b] = methods[a][b] = method
			} else {
				primaries[b][a] = methods[b][a] = method
			}
			count++
		}
	}

	const num = typeNames
	let missing = count !== num * (num - 1)

	while (missing) {
		missing = false
		let foundSome = false

		for (const a of typeNames) {
			for (const b of typeNames) {
				if (a === b) { continue }
				if (methods[a][b]) { continue }

				let found = false
				for (const c of typeNames) {
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
