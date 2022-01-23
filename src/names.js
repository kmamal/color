
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

module.exports = { fromName }
