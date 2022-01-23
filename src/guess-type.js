const Types = require('./types')

const guessType = (x) => {
	for (const [ type, { isMember } ] of Object.entries(Types)) {
		if (isMember(x)) { return type }
	}
	return null
}

module.exports = { guessType }
