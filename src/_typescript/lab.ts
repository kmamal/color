import Color from './color'

import * as Convert from './convert'
import Lch from './lch'
import Rgb from './rgb'


export default class Lab extends Color<Lab> {
	constructor (public L: number, public A: number, public B: number, public Alpha = 1) {
		super()
	}

	toRgb (): Rgb {
		const rgb = Convert.lab2rgb([ this.L, this.A, this.B, this.Alpha ])
		return new Rgb(rgb[0], rgb[1], rgb[2], rgb[3])
	}

	toLch (): Lch {
		const lch = Convert.lab2lch([ this.L, this.A, this.B, this.Alpha ])
		return new Lch(lch[0], lch[1], lch[2], lch[3])
	}

	interpolate (other: Lab, mix: number) {
		return new Lab(
			this.L + mix * (other.L - this.L),
			this.A + mix * (other.A - this.A),
			this.B + mix * (other.B - this.B),
			this.Alpha + mix * (other.Alpha - this.Alpha),
		)
	}
}
