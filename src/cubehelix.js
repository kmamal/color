
const cubehelix = (options = {}) => {
	const {
		start = 300,
		rotations = -1.5,
		hue: _hue = 1,
		gamma = 1,
		lightness: _lightness = [ 0, 1 ],
	} = options

	const lightness = Array.isArray(_lightness) ? _lightness : [ _lightness, _lightness ]
	const hue = Array.isArray(_hue) ? _hue : [ _hue, _hue ]

	const sl = lightness[0]
	const dl = lightness[1] - lightness[0]

	const sh = hue[0]
	const dh = hue[1] - hue[0]

	return (x) => {
		const a = Math.PI * 2 * ((start + 120) / 360 + rotations * x)
		const l = (sl + dl * x) ** gamma
		const h = sh + x * dh

		const amp = h * l * (1 - l) / 2

		const cos_a = Math.cos(a)
		const sin_a = Math.sin(a)

		const r = Math.max(0, Math.min(1, l + amp * (-0.14861 * cos_a + 1.78277 * sin_a)))
		const g = Math.max(0, Math.min(1, l + amp * (-0.29227 * cos_a - 0.90649 * sin_a)))
		const b = Math.max(0, Math.min(1, l + amp * (+1.97294 * cos_a)))

		return { r, g, b }
	}
}

module.exports = { cubehelix }
