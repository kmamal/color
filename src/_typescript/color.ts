import Rgb from './rgb'
import Lab from './lab'
import Lch from './lch'


export default abstract class Color<T> {
	abstract toRgb(): Rgb ;

	toLab (): Lab {
		const rgb = this.toRgb()
		return rgb.toLab()
	}

	toLch (): Lch {
		const rgb = this.toRgb()
		return rgb.toLch()
	}

	toCss (): string {
		const rgb = this.toRgb()
		return rgb.toCss()
	}

	abstract interpolate(other: T, mix: number): T ;
}
