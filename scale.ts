import Color from './color'

import { right } from 'libs/bisect'


type Step<T> = [number, T] ;


const scale = function<T extends Color<T>> (...colors: (T|Step<T>)[]) {
	if (colors.length < 2) {
		throw new Error("Give at least two colors")
	}

	if (!Array.isArray(colors[0])) {
		colors = Array.from(colors)
		for (let i = 0; i < colors.length; i++) {
			colors[i] = [ i, <T> colors[i] ]
		}
	}

	const steps = <Step<T>[]> colors

	const stops = steps.map((step) => step[0])
	const first = stops[0]
	const last = stops[steps.length - 1]
	const range = last - first

	return function (x: number): T {
		x = x * range + first

		if (x <= first) { return steps[0][1] }
		if (x >= last) { return steps[steps.length - 1][1] }

		const index = right(stops, x)
		const a = stops[index - 1]
		const b = stops[index]
		const r = b - a
		const mix = (x - a) / r

		const color_a = steps[index - 1][1]
		const color_b = steps[index][1]
		return color_a.interpolate(color_b, mix)
	}
}


export default scale
