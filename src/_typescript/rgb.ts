import Color from './color'

import * as Convert from './convert'
import Lab from './lab'
import Lch from './lch'


export default class Rgb extends Color<Rgb> {
	constructor (public R: number, public G: number, public B: number, public Alpha = 1) {
		super()
	}

	toRgb (): Rgb {
		return new Rgb(this.R, this.G, this.B, this.Alpha)
	}

	toLab (): Lab {
		const lab = Convert.rgb2lab([ this.R, this.G, this.B, this.Alpha ])
		return new Lab(lab[0], lab[1], lab[2], lab[3])
	}

	toLch (): Lch {
		const lch = Convert.rgb2lch([ this.R, this.G, this.B, this.Alpha ])
		return new Lch(lch[0], lch[1], lch[2], lch[3])
	}

	toCss (): string {
		const r = Math.floor(Math.max(0, Math.min(255, this.R)))
		const g = Math.floor(Math.max(0, Math.min(255, this.G)))
		const b = Math.floor(Math.max(0, Math.min(255, this.B)))
		return `rgba( ${r}, ${g}, ${b}, ${this.Alpha} )`
	}

	interpolate (other: Rgb, mix: number) {
		return new Rgb(
			this.R + mix * (other.R - this.R),
			this.G + mix * (other.G - this.G),
			this.B + mix * (other.B - this.B),
			this.Alpha + mix * (other.Alpha - this.Alpha),
		)
	}

	static fromHex (hex: string) {
		if (hex[0] === '#') { hex = hex.slice(1) }
		if (hex.length !== 6) { throw new Error('hex length is not 6') }
		const r = parseInt(hex.slice(0, 2), 16)
		const g = parseInt(hex.slice(2, 4), 16)
		const b = parseInt(hex.slice(4, 6), 16)
		return new Rgb(r, g, b)
	}
}
