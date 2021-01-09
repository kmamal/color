import Color from './color'

import * as Convert from './convert'
import Lab from './lab'
import Rgb from './rgb'


export default class Lch extends Color<Lch> {
	constructor (public L: number, public C: number, public H: number, public Alpha = 1) {
		super()
		this.H = ((this.H % 360) + 360) % 360
	}

	toRgb (): Rgb {
		const rgb = Convert.lch2rgb([ this.L, this.C, this.H, this.Alpha ])
		return new Rgb(rgb[0], rgb[1], rgb[2], rgb[3])
	}

	toLab (): Lab {
		const lab = Convert.lch2lab([ this.L, this.C, this.H, this.Alpha ])
		return new Lab(lab[0], lab[1], lab[2], lab[3])
	}

	interpolate (other: Lch, mix: number) {
		let dh = other.H - this.H
		if (Math.abs(dh) > 180) {
			dh -= 360
		}
		let h = this.H + mix * dh

		if (isNaN(h)) { h = this.H }
		if (isNaN(h)) { h = other.H }

		return new Lch(
			this.L + mix * (other.L - this.L),
			this.C + mix * (other.C - this.C),
			h,
			this.Alpha + mix * (other.Alpha - this.Alpha),
		)
	}
}
