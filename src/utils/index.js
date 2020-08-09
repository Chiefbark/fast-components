export function stylesToCSS(obj) {
	return Object.keys(obj).map(x =>
		Object.keys(obj[x]).map(y =>
			y === 'default' ? `.${x}{${getStyles(obj[x][y])}}` : `.${x}${y}{${getStyles(obj[x][y])}}`
		).join('')
	).join('');
}

function getStyles(obj) {
	return Object.entries(obj)
		.map(([k, v]) =>
			`${k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}:${v}`
		).join(';');
}