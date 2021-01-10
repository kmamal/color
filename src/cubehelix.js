
const makeCubehelix = (options = {}) => {
	const {
		start = 300,
		rotations = -1.5,
		hue: _hue = 1,
		gamma = 1,
		lightness: _lightness = [ 0, 1 ],
	} = options

	const [ lightness_start, lightness_end ] = !Array.isArray(_lightness)
		? [ _lightness, _lightness ]
		: _lightness
	const lightness_range = lightness_end - lightness_start

	const [ hue_start, hue_end ] = !Array.isArray(_hue)
		? [ _hue, _hue ]
		: _hue
	const hue_range = hue_end - hue_start

	return (x) => {
		const angle = Math.PI * 2 * (start / 3 + rotations * x)
		const lightness = (lightness_start + lightness_range * x) ** gamma
		const hue = hue_start + x * hue_range

		const amp = hue * lightness * (1 - lightness) / 2

		const cos = Math.cos(angle)
		const sin = Math.sin(angle)

		const r = Math.max(0, Math.min(1, lightness + amp * (-0.14861 * cos + 1.78277 * sin)))
		const g = Math.max(0, Math.min(1, lightness + amp * (-0.29227 * cos - 0.90649 * sin)))
		const b = Math.max(0, Math.min(1, lightness + amp * (+1.97294 * cos)))

		return { r, g, b }
	}
}

module.exports = { makeCubehelix }
