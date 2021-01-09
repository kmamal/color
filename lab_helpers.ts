
export const Constants = {
	// Corresponds roughly to RGB brighter/darker
	Kn: 18,

	// D65 standard referent
	Xn: 0.950470,
	Yn: 1,
	Zn: 1.088830,

	t0: 0.137931034,  // 4 / 29
	t1: 0.206896552,  // 6 / 29
	t2: 0.12841855,   // 3 * t1 * t1
	t3: 0.008856452,  // t1 * t1 * t1
}


export const xyz_rgb = function (r: number) {
	r = r <= 0.00304
		? 12.92 * r
		: 1.055 * r ** (1 / 2.4) - 0.055
	return r * 255
}

export const rgb_xyz = function (r: number) {
	r /= 255
	return r <= 0.04045
		? r / 12.92
		: ((r + 0.055) / 1.055) ** 2.4
}


export const lab_xyz = function (t: number) {
	return t > Constants.t1
		? t * t * t
		: Constants.t2 * (t - Constants.t0)
}

export const xyz_lab = function (t: number) {
	return t > Constants.t3
		? t ** (1 / 3)
		: t / Constants.t2 + Constants.t0
}
