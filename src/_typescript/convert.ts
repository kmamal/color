import * as Lab from './lab_helpers'

type Color = [number, number, number, number|undefined] ;


// LAB <==> RBG

export const lab2rgb = function ([ l, a, b, alpha ]: Color): Color {
	let y = (l + 16) / 116
	let x = isNaN(a) ? y : y + a / 500
	let z = isNaN(b) ? y : y - b / 200

	y = Lab.Constants.Yn * Lab.lab_xyz(y)
	x = Lab.Constants.Xn * Lab.lab_xyz(x)
	z = Lab.Constants.Zn * Lab.lab_xyz(z)

	const rgb_r = Lab.xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z)  // D65 -> sRGB
	const rgb_g = Lab.xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z)
	const rgb_b = Lab.xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z)

	return [ rgb_r, rgb_g, rgb_b, alpha !== undefined ? alpha : 1 ]
}

export const rgb2lab = function ([ r, g, b, alpha ]: Color): Color {
	r = Lab.rgb_xyz(r)
	g = Lab.rgb_xyz(g)
	b = Lab.rgb_xyz(b)

	const y = Lab.xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / Lab.Constants.Yn)
	const x = Lab.xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / Lab.Constants.Xn)
	const z = Lab.xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / Lab.Constants.Zn)

	const lab_l = 116 * y - 16
	const lab_a = 500 * (x - y)
	const lab_b = 200 * (y - z)

	return [ lab_l, lab_a, lab_b, alpha !== undefined ? alpha : 1 ]
}


// LAB <==> HCL

const RAD2DEG = 180 / Math.PI
const DEG2RAD = 1 / RAD2DEG

export const lab2lch = function ([ l, a, b, alpha ]: Color): Color {
	const c = Math.sqrt(a * a + b * b)
	let h = (Math.atan2(b, a) * RAD2DEG + 360) % 360
	if (Math.round(c * 10000) === 0) { h = NaN }
	return [ l, c, h, alpha !== undefined ? alpha : 1 ]
}

export const lch2lab = function ([ l, c, h, alpha ]: Color): Color {
	h *= DEG2RAD
	const a = Math.cos(h) * c
	const b = Math.sin(h) * c
	return [ l, a, b, alpha !== undefined ? alpha : 1 ]
}


// HCL <==> RGB

export const lch2rgb = function (lch: Color): Color {
	const lab = lch2lab(lch)
	return lab2rgb(lab)
}

export const rgb2lch = function (rgb: Color): Color {
	const lab = rgb2lab(rgb)
	return lab2lch(lab)
}
